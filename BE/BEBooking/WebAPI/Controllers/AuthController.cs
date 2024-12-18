using Application.DTOs;
using Application.DTOs.UserDTOs;
using Application.Interfaces;
using Google.Apis.Auth.OAuth2.Requests;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("sendResetPasswordEmail")]
        public async Task<IActionResult> SendResetPasswordEmail([FromQuery] string username)
        {
            try
            {
                bool emailSent = await _authService.SendResetPasswordEmailAsync(username);
                if (emailSent)
                {
                    return Ok("Link reset mật khẩu đã được gửi tới email của bạn.");
                }
                else
                {
                    return StatusCode(500, "Không thể gửi email reset mật khẩu.");
                }
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Không tìm thấy tài khoản với tên đăng nhập này.");
            }
            catch (Exception)
            {
                return BadRequest("Không thể gửi email reset mật khẩu.");
            }
        }

        [HttpPatch("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromHeader] string Authorization, [FromBody] ResetPasswordRequestDTO resetPasswordRequestDTO)
        {
            try
            {
                var token = Authorization.StartsWith("Bearer ") ? Authorization.Substring(7) : Authorization;
                await _authService.ResetPasswordAsync(token, resetPasswordRequestDTO.NewPassword);
                return Ok("Mật khẩu của bạn đã được thay đổi.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AccountDTO accountDTO)
        {
            try
            {
                var result = await _authService.LoginAsync(accountDTO);
                if (result.IsSuccess)
                {
                    return Ok(result);
                }
                else
                {
                    return Unauthorized(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("oauth2")]
        public async Task<IActionResult> GoogleLogin([FromBody] Application.DTOs.TokenRequest tokenRequest)
        {
            try
            {
                // Gọi hàm LoginWithGoogleAsync từ service để xử lý đăng nhập
                var response = await _authService.LoginWithGoogleAsync(tokenRequest.Token);
                if (response.IsSuccess)
                {
                    return Ok(response);
                }
                else
                {
                    return Unauthorized(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi hệ thống", details = ex.Message });
            }
        }

        [HttpGet("validate-token")]
        public async Task<IActionResult> ValidateToken([FromServices] IHttpContextAccessor httpContextAccessor)
        {
            try
            {
                var token = httpContextAccessor.HttpContext.Request.Cookies["AUTH_TOKEN"];
                if (string.IsNullOrEmpty(token))
                {
                    return Unauthorized("Token is missing");
                }
                var userDTO = await _authService.ValidateToken(token);
                if (userDTO == null)
                {
                    return Unauthorized("Invalid or expired token");
                }
                return Ok(userDTO);
            }
            catch (Exception ex)
            {
                return Unauthorized($"Error: {ex.Message}");
            }
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _authService.LogoutAsync();
                return Ok("Logout successful");
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
