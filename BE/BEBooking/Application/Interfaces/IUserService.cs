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
    public interface IUserService
    {
        bool CheckUsernameExists(string username);
        bool CheckEmailExists(string email);
        Task<UserDTO> CreateNewOneUserAsync(UserResponseDTO user);
        Task<ResponseDatatable<UserDTO>> GetUsersAdminTableAsync(int pageIndex, int pageSize = 10);
        Task<ResponseDatatable<UserDTO>> GetUsersAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10);
    }
}
