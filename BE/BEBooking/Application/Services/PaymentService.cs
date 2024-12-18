using Application.DTOs;
using Application.Interfaces;
using Domain.Abstract;
using Domain.Entities;
using Domain.Setting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly MomoConfig _momoConfig;
        private readonly HttpClient _httpClient;
        public PaymentService(IUnitOfWork unitOfWork, IOptions<MomoConfig> momoConfig, HttpClient httpClient)
        {
            _unitOfWork = unitOfWork;
            _momoConfig = momoConfig.Value;
            _httpClient = httpClient;
        }

        public async Task<Payment> CreateNewOnePaymentAsync(Payment payment)
        {
            var bookingIds = payment.BookingIds?.Split(',')
                .Select(id => int.Parse(id))
                .ToList();
            foreach (var id in bookingIds)
            {
                var booking = await _unitOfWork.BookingRepository.GetBookingByIdAsync(id) ?? throw new KeyNotFoundException("Booking not found.");
                booking.Status = "Đã được đặt";
                await _unitOfWork.BookingRepository.UpdateBookingAsync(booking);

            }
            var paymentCreated = await _unitOfWork.PaymentRepository.CreateNewOnePayment(payment);
            return paymentCreated;
        }

        public async Task<MomoPaymentResponseDTO> InitiatePaymentAsync(float total, string paymentId)
        {
            var requestData = new Dictionary<string, string>
            {
                { "partnerCode", _momoConfig.PartnerCode },
                { "accessKey", _momoConfig.AccessKey },
                { "requestId", paymentId },
                { "amount", Math.Round(total).ToString() },
                { "orderId", paymentId + DateTime.UtcNow.Ticks },
                { "orderInfo", "Thanh toán đơn hàng " + paymentId },
                { "returnUrl", _momoConfig.ReturnUrl },
                { "notifyUrl", _momoConfig.NotifyUrl },
                { "redirectUrl", _momoConfig.ReturnUrl },
                { "extraData", "" },
                { "lang", "vi" },
                { "ipnUrl", _momoConfig.IpnUrl },
                { "requestType", "captureWallet" }
            };
            string signature = GenerateSignature(requestData);
            requestData.Add("signature", signature);

            // Send POST request to MoMo API
            var content = new StringContent(JsonConvert.SerializeObject(requestData), Encoding.UTF8, "application/json");

            MomoPaymentResponseDTO response = null;
            try
            {
                var result = await _httpClient.PostAsync(_momoConfig.MomoApiUrl, content);
                if (result.IsSuccessStatusCode)
                {
                    var responseContent = await result.Content.ReadAsStringAsync();
                    response = JsonConvert.DeserializeObject<MomoPaymentResponseDTO>(responseContent);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while sending request to MoMo API", ex);
            }

            return response ?? new MomoPaymentResponseDTO { ResultCode = "1", Message = "Failed to create payment URL" };
        }
        private string GenerateSignature(Dictionary<string, string> data)
        {
            var dataString = new StringBuilder();

            // Append data in the required order
            dataString.Append($"accessKey={_momoConfig.AccessKey}");
            dataString.Append($"&amount={data["amount"]}");
            dataString.Append($"&extraData={data["extraData"]}");
            dataString.Append($"&ipnUrl={data["ipnUrl"]}");
            dataString.Append($"&orderId={data["orderId"]}");
            dataString.Append($"&orderInfo={data["orderInfo"]}");
            dataString.Append($"&partnerCode={data["partnerCode"]}");
            dataString.Append($"&redirectUrl={data["redirectUrl"]}");
            dataString.Append($"&requestId={data["requestId"]}");
            dataString.Append($"&requestType={data["requestType"]}");

            string rawSignature = dataString.ToString();

            return ComputeHmacSha256(rawSignature, _momoConfig.SecretKey);
        }

        private static string ComputeHmacSha256(string data, string key)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA256())
            {
                hmac.Key = Encoding.UTF8.GetBytes(key);
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
                return BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
        }

        public async Task HandlePaymentFailedAsync(int paymentId)
        {
            // Tìm Payment theo paymentId
            var payment = await _unitOfWork.PaymentRepository.GetPaymentById(paymentId);
            if (payment == null)
            {
                throw new KeyNotFoundException("Payment not found");
            }

            // Xử lý các booking liên quan
            var bookingIds = payment.BookingIds.Split(',').Select(int.Parse).ToArray();
            foreach (var bookingId in bookingIds)
            {
                var booking = await _unitOfWork.BookingRepository.GetBookingByIdAsync(bookingId);
                if (booking == null)
                {
                    throw new KeyNotFoundException("Booking not found");
                }

                // Cập nhật trạng thái booking
                booking.Status = "Đang chờ";
                await _unitOfWork.BookingRepository.UpdateBookingAsync(booking);
            }

            // Xóa payment
            await _unitOfWork.PaymentRepository.DeleteAsync(payment);
        }

        public async Task<bool> VerifySignatureAsync(IpNotificationRequest ipnData, string receivedSignature)
        {
            // 1. Tạo chữ ký từ các tham số trong ipnData
            var data = new Dictionary<string, string>
            {
                { "partnerCode", ipnData.PartnerCode },
                { "accessKey", _momoConfig.AccessKey },
                { "requestId", ipnData.RequestId },
                { "amount", ipnData.Amount.ToString() },
                { "orderId", ipnData.OrderId },
                { "orderInfo", ipnData.OrderInfo },
                { "returnUrl", _momoConfig.ReturnUrl },
                { "extraData", ipnData.ExtraData },
                { "notifyUrl", _momoConfig.NotifyUrl },
                { "ipnUrl", _momoConfig.IpnUrl },
                { "redirectUrl", _momoConfig.ReturnUrl },
                { "lang", "vi" },
                { "requestType", "captureWallet" }
            };

            // 2. Tạo chữ ký từ các tham số
            string generatedSignature = GenerateSignature(data);

            // 3. So sánh chữ ký đã nhận với chữ ký đã tạo
            return generatedSignature.Equals(receivedSignature, StringComparison.OrdinalIgnoreCase);
        }

        public Task<IEnumerable<Payment>> GetAllPayments()
        {
            throw new NotImplementedException();
        }

        public async Task<List<Payment>> GetPaymentsByUserAsync(string userId)
        {
            return await _unitOfWork.PaymentRepository.GetPaymentsByUserIdAsync(userId);
        }
    }
}
