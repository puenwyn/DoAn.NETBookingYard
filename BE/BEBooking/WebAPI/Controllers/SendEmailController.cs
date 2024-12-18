using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SendEmailController : ControllerBase
    {
        private readonly ISendEmailService sendEmailService;
        public SendEmailController(ISendEmailService sendEmailService)
        {
            this.sendEmailService = sendEmailService;
        }

        [HttpGet("send-otp")]
        public async Task<IActionResult> SendOTP(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email is not valid.");
            }
            try
            {
                var result = await sendEmailService.SendOtp(email);
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Đã xảy ra lỗi khi gửi email: " + e.Message);
            }
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp(string email, string otp)
        {
            if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(otp))
            {
                return BadRequest("Email or otp is not valid.");
            }
            try
            {
                var result = await sendEmailService.VerifyOtp(email, otp);
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Đã xảy ra lỗi khi gửi email: " + e.Message);
            }
        }
    }
}
