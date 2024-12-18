using Application.DTOs;
using Application.DTOs.OwnerDTOs;
using Application.DTOs.UserDTOs;
using Application.Interfaces;
using Domain.Abstract;
using Domain.Entities;
using Domain.Setting;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public UserService(IUnitOfWork unitOfWork, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public bool CheckEmailExists(string email)
        {
            return _unitOfWork.UserRepository.ExistByEmail(email);
        }

        public bool CheckUsernameExists(string username)
        {
            return _unitOfWork.UserRepository.ExistByUsername(username);
        }

        public async Task<UserDTO> CreateNewOneUserAsync(UserResponseDTO user)
        {
            try
            {
                var existUser = await _userManager.FindByNameAsync(user.Username);
                if (existUser == null)
                {
                    existUser = await _userManager.FindByEmailAsync(user.Email);
                    if (existUser == null)
                    {
                        var userCreate = new User
                        {
                            UserName = user.Username,
                            Email = user.Email,
                            PhoneNumber = user.PhoneNumber,
                            FullName = user.FullName,
                            DateOfBirth = user.DateOfBirth,
                            Gender = user.Gender,
                            Address = user.Address,
                            FCMToken = user.FcmToken
                        };
                        var identityResult = await _userManager.CreateAsync(userCreate, user.HashedPassword);

                        if (!identityResult.Succeeded)
                        {
                            throw new Exception("Failed to create user: " + string.Join(", ", identityResult.Errors.Select(e => e.Description)));
                        }
                        var customerRole = "Customer";
                        if (!await _roleManager.RoleExistsAsync(customerRole))
                        {
                            await _roleManager.CreateAsync(new IdentityRole(customerRole));
                        }
                        var roles = await _userManager.GetRolesAsync(userCreate);
                        await _userManager.AddToRoleAsync(userCreate, customerRole);
                        return new UserDTO
                        {
                            Id = userCreate.Id,
                            Email = userCreate.Email,
                            FullName = userCreate.FullName,
                            PhoneNumber = userCreate.PhoneNumber,
                            DateOfBirth = userCreate.DateOfBirth,
                            Gender = userCreate?.Gender,
                            Address = userCreate?.Address,
                            Role = string.Join(", ", roles)
                        };
                    }
                    else
                    {
                        throw new Exception("Email already exists.");
                    }
                }
                else
                {
                    throw new Exception("Username already exists.");
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<ResponseDatatable<UserDTO>> GetUsersAdminTableAsync(int pageIndex, int pageSize = 10)
        {
            var (users, totalRecords) = await _unitOfWork.UserRepository.GetUsersAdminTableAsync(pageIndex, pageSize);
            var userRoles = await GetUserRolesAsync(users);
            var userDtos = users.Select(user =>
                {
                    var role = userRoles.FirstOrDefault(r => r.UserId == user.Id)?.Role ?? "No Role";
                    if (role == "SuperAdmin")
                    {
                        return null;
                    }
                    return new UserDTO
                    {
                        Id = user.Id,
                        FullName = user.FullName,
                        Email = user.Email,
                        Address = user.Address,
                        DateOfBirth = user.DateOfBirth,
                        PhoneNumber = user.PhoneNumber,
                        Gender = user.Gender,
                        Role = role
                    };
                })
                .Where(dto => dto != null)
                .ToList();

            return new ResponseDatatable<UserDTO>(userDtos.Count, userDtos, pageSize);
        }
        private async Task<List<UserRoleDTO>> GetUserRolesAsync(IEnumerable<User> users)
        {
            var userRoles = new List<UserRoleDTO>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var role = roles.FirstOrDefault() ?? "No Role";

                userRoles.Add(new UserRoleDTO
                {
                    UserId = user.Id,
                    Role = role
                });
            }
            return userRoles;
        }

        public async Task<ResponseDatatable<UserDTO>> GetUsersAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10)
        {
            var (users, totalRecords) = await _unitOfWork.UserRepository.GetUsersAdminTableBySearchAsync(key, pageIndex, pageSize);
            var userRoles = await GetUserRolesAsync(users);
            var userDtos = users.Select(user =>
            {
                var role = userRoles.FirstOrDefault(r => r.UserId == user.Id)?.Role ?? "No Role";
                if (role == "SuperAdmin")
                {
                    return null;
                }
                return new UserDTO
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    Address = user.Address,
                    DateOfBirth = user.DateOfBirth,
                    PhoneNumber = user.PhoneNumber,
                    Gender = user.Gender,
                    Role = role
                };
            })
                .Where(dto => dto != null)
                .ToList();

            return new ResponseDatatable<UserDTO>(userDtos.Count, userDtos, pageSize);
        }
    }
}
