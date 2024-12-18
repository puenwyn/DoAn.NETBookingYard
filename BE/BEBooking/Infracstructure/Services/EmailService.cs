using Domain.Abstract;
using Domain.Setting;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private MimeMessage CreateMessage(EmailSetting emailSetting, bool IsBodyHtml)
        {
            var senderName = _configuration["EmailSettings:SenderName"];
            var senderEmail = _configuration["EmailSettings:SenderEmail"];

            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(new MailboxAddress(senderName, senderEmail));
            mimeMessage.To.Add(new MailboxAddress(emailSetting.Name, emailSetting.To));
            mimeMessage.Subject = emailSetting.Subject;
            mimeMessage.Body = new TextPart(IsBodyHtml ? "html" : "plain") { Text = emailSetting.Content };

            if (emailSetting.CC.Any())
            {
                foreach (var cc in emailSetting.CC)
                {
                    mimeMessage.Cc.Add(new MailboxAddress(cc, cc));
                }
            }

            var attachmentList = emailSetting.AttachmentFiles.Select(filePath => new MimePart("application", "octet-stream")
            {
                FileName = Path.GetFileName(filePath),
                ContentTransferEncoding = ContentEncoding.Base64,
                ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                Content = new MimeContent(new MemoryStream(File.ReadAllBytes(filePath)))
            }).ToList();

            if (attachmentList.Any())
            {
                var multipart = new Multipart("mixed");
                if (mimeMessage.Body is TextPart textPart)
                {
                    multipart.Add(textPart);
                }
                foreach (var attachment in attachmentList)
                {
                    multipart.Add(attachment);
                }
                mimeMessage.Body = multipart;
            }

            return mimeMessage;
        }

        public async Task<bool> SendEmailAsync(EmailSetting emailSetting, bool IsBodyHtml)
        {
            try
            {
                var mimeMessage = CreateMessage(emailSetting, IsBodyHtml);
                var smtpServer = _configuration["EmailSettings:SmtpServer"];
                var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"]);
                var senderEmail = _configuration["EmailSettings:SenderEmail"];
                var senderPassword = _configuration["EmailSettings:SenderPassword"];

                if (string.IsNullOrEmpty(smtpServer) || smtpPort <= 0 || string.IsNullOrEmpty(senderEmail) || string.IsNullOrEmpty(senderPassword))
                {
                    Console.WriteLine("Thông tin cấu hình SMTP không hợp lệ.");
                    return false;
                }

                using (var smtpClient = new SmtpClient())
                {
                    // Đảm bảo rằng chứng chỉ SSL được tin cậy (có thể bỏ qua kiểm tra nếu gặp vấn đề)
                    //smtpClient.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;
                    smtpClient.CheckCertificateRevocation = false;

                    await smtpClient.ConnectAsync(smtpServer, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                    await smtpClient.AuthenticateAsync(senderEmail, senderPassword);
                    await smtpClient.SendAsync(mimeMessage);
                    await smtpClient.DisconnectAsync(true);
                }

                Console.WriteLine("Email sent successfully.");
                return true;
            }
            catch (SmtpCommandException smtpEx)
            {
                Console.WriteLine($"SMTP error: {smtpEx.Message}");
                return false;
            }
            catch (SmtpProtocolException protocolEx)
            {
                Console.WriteLine($"SMTP protocol error: {protocolEx.Message}");
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine($"An unexpected error occurred: {e.Message}");
                return false;
            }
        }
    }
}
