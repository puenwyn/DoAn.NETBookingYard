using Application.Interfaces;
using Application.Utils;
using Domain.Abstract;
using Domain.Setting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace Application.Services
{
    public class SendEmailService : ISendEmailService
    {
        private readonly IEmailService _emailService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SendEmailService(IEmailService emailService, IHttpContextAccessor httpContextAccessor)
        {
            _emailService = emailService;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<string> SendOtp(string email)
        {
            try
            {
                var otp = RandomOTP.GenerateOTP();

                string subject = "Mã OTP của bạn";
                string content = $"Mã OTP của bạn là: {otp}. Vui lòng sử dụng mã này để hoàn tất quá trình xác minh. Mã OTP có hiệu 5 phút";
                EmailSetting emailSetting = new()
                {
                    To = email,
                    Subject = subject,
                    Content = content
                };
                bool result = await _emailService.SendEmailAsync(emailSetting, false);
                if (result)
                {
                    var session = _httpContextAccessor?.HttpContext?.Session;
                    var expirationTime = DateTime.UtcNow.AddMinutes(5);
                    session?.SetString(email, otp);
                    session?.SetString("OTP_EXPIRATION_TIME", expirationTime.ToString("o"));
                    return "Mã OTP đã được gửi thành công.";
                }
                else
                {
                    return "Đã xảy ra lỗi khi gửi email.";
                }
            }
            catch (Exception ex)
            {
                return $"Lỗi: {ex.Message}";
            }
        }
        public async Task<string> VerifyOtp(string email, string enteredOtp)
        {
            try
            {
                var session = _httpContextAccessor?.HttpContext?.Session;
                var storedOtp = session?.GetString(email);
                var expirationTimeString = session?.GetString("OTP_EXPIRATION_TIME");

                if (string.IsNullOrEmpty(storedOtp))
                {
                    return "Không tìm thấy mã OTP trong phiên làm việc. Vui lòng yêu cầu OTP mới.";
                }
                if (DateTime.TryParse(expirationTimeString, out DateTime expirationTime))
                {
                    if (DateTime.UtcNow > expirationTime)
                    {
                        session?.Remove(email);
                        session?.Remove("OTP_EXPIRATION_TIME");
                        return "Mã OTP đã hết hạn. Vui lòng yêu cầu OTP mới.";
                    }
                }
                else
                {
                    return "Lỗi khi kiểm tra thời gian hết hạn OTP.";
                }
                if (storedOtp == enteredOtp)
                {
                    session?.Remove(email);
                    session?.Remove("OTP_EXPIRATION_TIME");
                    return "OTP hợp lệ. Xác thực thành công.";
                }
                else
                {
                    return "Mã OTP không chính xác. Vui lòng kiểm tra lại.";
                }
            }
            catch (Exception ex)
            {
                return $"Lỗi: {ex.Message}";
            }
        }
    }
}
