using Application.DTOs;
using Application.DTOs.UserDTOs;
using Application.Interfaces;
using Domain.Abstract;
using Domain.Entities;
using Domain.Setting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IEmailService _emailService;
        private readonly SignInManager<User> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IGoogleAuthService _googleAuthService;
        private readonly IUserService _userService;
        public AuthService(UserManager<User> userManager, IJwtTokenService jwtTokenService, IEmailService emailService, SignInManager<User> signInManager, IHttpContextAccessor httpContextAccessor, IUserService userService, IGoogleAuthService googleAuthService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
            _emailService = emailService;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
            _userService = userService;
            _googleAuthService = googleAuthService;
        }
        public async Task<bool> SendResetPasswordEmailAsync(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user != null)
            {
                var token = _jwtTokenService.GenerateToken(username, DateTime.UtcNow.AddHours(1));
                var resetLink = $"http://localhost:3000/auth/forgot-password?token={token}";
                var subject = "Yêu cầu thay đổi mật khẩu";
                var content = $"<html><body>"
                              + $"<h2>Chào bạn,</h2>"
                              + $"<p>Chúng tôi đã nhận được yêu cầu thay đổi mật khẩu cho tài khoản {username}.</p>"
                              + $"<p>Vui lòng <a href=\"{resetLink}\" style=\"font-size:16px; color: #ffffff; background-color: #007bff; padding: 10px 20px; text-decoration: none; border-radius: 5px;\">nhấn vào đây</a> để đặt lại mật khẩu của bạn.</p>"
                              + $"<p>Chúng tôi khuyên bạn chỉ nên sử dụng đường link này nếu bạn yêu cầu thay đổi mật khẩu.</p>"
                              + $"<p>Cảm ơn bạn!</p>"
                              + $"<p>Trân trọng,</p>"
                              + $"<p><strong>Đội ngũ hỗ trợ</strong></p>"
                              + $"</body></html>";
                EmailSetting emailSetting = new()
                {
                    To = user.Email,
                    Subject = subject,
                    Content = content
                };
                bool result = await _emailService.SendEmailAsync(emailSetting, true);
                return result;
            }
            else
            {
                throw new KeyNotFoundException("User not found");
            }
        }

        public async Task ResetPasswordAsync(string token, string newPassword)
        {
            try
            {
                var username = _jwtTokenService.VerifyTokenAndGetUsername(token);
                var user = await _userManager.FindByNameAsync(username) ?? throw new KeyNotFoundException("Không tìm thấy tài khoản.");
                var resetResult = await _userManager.RemovePasswordAsync(user);
                if (!resetResult.Succeeded)
                {
                    throw new Exception("Không thể xóa mật khẩu cũ.");
                }
                var addPasswordResult = await _userManager.AddPasswordAsync(user, newPassword);
                if (!addPasswordResult.Succeeded)
                {
                    throw new Exception("Không thể thiết lập mật khẩu mới.");
                }
                await _userManager.UpdateAsync(user);
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi đổi mật khẩu: " + ex.Message);
            }
        }

        public async Task<ResponseLoginDTO> LoginAsync(AccountDTO accountDTO)
        {
            var user = await _userManager.FindByNameAsync(accountDTO.Username);
            if (user != null)
            {
                var signInResult = await _signInManager.PasswordSignInAsync(user, accountDTO.Password, false, false);
                if (!signInResult.Succeeded)
                {
                    return new ResponseLoginDTO
                    {
                        IsSuccess = false,
                        JwtToken = "",
                        Message = "Mật khẩu không chính xác"
                    };
                }
                else
                {
                    await _signInManager.SignInAsync(user, false);
                    var token = _jwtTokenService.GenerateToken(user.UserName, DateTime.UtcNow.AddDays(1));
                    var response = _httpContextAccessor.HttpContext.Response;
                    response.Cookies.Append("AUTH_TOKEN", token,
                        new CookieOptions
                        {
                            HttpOnly = true,
                            Secure = true,
                            SameSite = SameSiteMode.None,
                            MaxAge = TimeSpan.FromDays(1)
                        });
                    return new ResponseLoginDTO
                    {
                        IsSuccess = true,
                        JwtToken = "",
                        Message = "Đăng nhập thành công"
                    };
                }
            }
            else
            {
                return new ResponseLoginDTO
                {
                    IsSuccess = false,
                    JwtToken = "",
                    Message = "Tài khoản không tồn tại"
                };
            }
        }

        public async Task<UserDTO?> ValidateToken(string token)
        {
            try
            {
                var username = _jwtTokenService.VerifyTokenAndGetUsername(token);
                var user = (await _userManager.FindByNameAsync(username) ?? throw new KeyNotFoundException("Không tìm thấy tài khoản.")) ?? throw new KeyNotFoundException("Không tìm thấy tài khoản.");
                var roles = await _userManager.GetRolesAsync(user);
                return new UserDTO
                {
                    Id = user.Id,
                    Email = user.Email,
                    FullName = user.FullName,
                    PhoneNumber = user.PhoneNumber,
                    DateOfBirth = user.DateOfBirth,
                    Gender = user?.Gender,
                    Address = user?.Address,
                    Role = roles.FirstOrDefault()
                };
            }
            catch (Exception ex)
            {
                throw new Exception("Có lỗi xảy ra khi đổi mật khẩu: " + ex.Message);
            }
        }

        public async Task LogoutAsync()
        {
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            var userNameClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name)?.Value;
            var userEmailClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;
            Console.WriteLine($"UserName: {userNameClaim}, Email: {userEmailClaim}");
            if (user == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }
            if (user is not IdentityUser)
            {
                throw new UnauthorizedAccessException("Invalid user.");
            }
            await _signInManager.SignOutAsync();
            _httpContextAccessor.HttpContext.Response.Cookies.Delete("AUTH_TOKEN", new CookieOptions
            {
                SameSite = SameSiteMode.None,
                Secure = true,
            });
        }

        public async Task<ResponseLoginDTO> LoginWithGoogleAsync(string idToken)
        {
            var userInfo = await _googleAuthService.GetUserInfoFromGoogleAsync(idToken) ?? throw new KeyNotFoundException("Invalid token or user info not found");
            var existingUser = await _userManager.FindByEmailAsync(userInfo.Email);
            if (existingUser == null)
            {
                var newUser = new UserResponseDTO
                {
                    Email = userInfo.Email,
                    FullName = userInfo.FullName,
                    Username = userInfo.Email,
                    HashedPassword = "test00987654321",
                };
                await _userService.CreateNewOneUserAsync(newUser);
                existingUser = await _userManager.FindByEmailAsync(userInfo.Email);
            }
            await _signInManager.SignInAsync(existingUser, false);
            var token = _jwtTokenService.GenerateToken(existingUser.UserName, DateTime.UtcNow.AddDays(1));
            var response = _httpContextAccessor.HttpContext.Response;
            response.Cookies.Append("AUTH_TOKEN", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                MaxAge = TimeSpan.FromDays(1)
            });
            return new ResponseLoginDTO
            {
                IsSuccess = true,
                JwtToken = token,
                Message = "Đăng nhập thành công qua Google"
            };
        }
    }
}
