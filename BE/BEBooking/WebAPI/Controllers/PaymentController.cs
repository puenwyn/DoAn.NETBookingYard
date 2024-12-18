using Application.DTOs;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }
        [HttpPost]
        public async Task<IActionResult> AddPayment([FromBody] Payment payment)
        {
            try
            {
                var createdPayment = await _paymentService.CreateNewOnePaymentAsync(payment);
                return CreatedAtAction(nameof(AddPayment), new { id = createdPayment.Id }, createdPayment);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpPost("momo")]
        public async Task<IActionResult> InitiatePayment([FromBody] Payment payment)
        {
            if (payment == null || payment.Total <= 0)
                return BadRequest("Invalid payment data");

            var result = await _paymentService.InitiatePaymentAsync(payment.Total, payment.Id.ToString());
            return Ok(result);
        }
        [HttpPost("ipn")]
        public async Task<IActionResult> IpNotification([FromBody] IpNotificationRequest ipnData)
        {
            try
            {

                // In thông tin nhận được
                Console.WriteLine("Received IPN: " + string.Join(", ", ipnData));

                string signature = ipnData.Signature;
                bool isValidSignature = await _paymentService.VerifySignatureAsync(ipnData, signature);

                //if (!isValidSignature)
                //{
                //    return Unauthorized("Invalid signature"); ;
                //}

                string resultCode = ipnData.ResultCode.ToString();
                string paymentId = ipnData.RequestId;
                string message = ipnData.Message;

                if (resultCode == "0")
                {
                    // Thanh toán thành công
                    Console.WriteLine("Payment successful.");
                }
                else
                {
                    // Thanh toán thất bại
                    Console.WriteLine("Payment failed: " + message);
                    if (int.TryParse(paymentId, out var id))
                    {
                        await _paymentService.HandlePaymentFailedAsync(id);
                    }
                }

                return Ok("Notification received successfully");
            }
            catch (Exception ex)
            {
                // Log exception details
                Console.WriteLine($"Error processing IPN: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        // Xử lý thông báo thanh toán (Notify)
        [HttpPost("notify")]
        public async Task<IActionResult> Notify([FromBody] IpNotificationRequest notifyData)
        {
            if (notifyData == null || notifyData.ResultCode == 0)
            {
                return BadRequest("Invalid data from MoMo");
            }
            Console.WriteLine("HELLO XIN CHÀO");
            System.Console.WriteLine (notifyData);

            string signature = notifyData.Signature;
            bool isValidSignature = await _paymentService.VerifySignatureAsync(
                notifyData, signature);

            if (!isValidSignature)
            {
                return Forbid("Invalid signature");
            }

            string resultCode = notifyData.ResultCode.ToString();
            string paymentId = notifyData.RequestId;
            string message = notifyData.Message;

            if (resultCode == "0")
            {
                // Thanh toán thành công, không làm gì
            }
            else
            {
                // Thanh toán thất bại, xử lý lại
                if (int.TryParse(paymentId, out var id))
                {
                    await _paymentService.HandlePaymentFailedAsync(id);
                }
            }

            return Ok("Notification received successfully");
        }
    }
}
