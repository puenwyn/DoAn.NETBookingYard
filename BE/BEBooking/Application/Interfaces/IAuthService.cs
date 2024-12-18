using Application.DTOs;
using Application.DTOs.UserDTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IAuthService
    {
        Task<bool> SendResetPasswordEmailAsync(string username);
        Task ResetPasswordAsync(string token, string newPassword);
        Task<ResponseLoginDTO> LoginAsync(AccountDTO accountDTO);
        Task<UserDTO?> ValidateToken(string token);
        Task LogoutAsync();
        Task<ResponseLoginDTO> LoginWithGoogleAsync(string idToken);
    }
}
