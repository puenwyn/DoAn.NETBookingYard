using Application.DTOs.OwnerDTOs;
using Application.DTOs;
using Application.Interfaces;
using Application.Services;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.UserDTOs;
using Domain.Entities;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController (IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("check-username")]
        public bool CheckUsernameExists([FromQuery] string username)
        {
            return _userService.CheckUsernameExists(username);
        }

        [HttpGet("check-email/valid")]
        public bool CheckEmailExists([FromQuery] string email)
        {
            return _userService.CheckEmailExists(email);
        }

        [HttpGet("admin")]
        public async Task<IActionResult> GetUsers([FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
        {
            if (pageIndex < 1 || pageSize < 1)
            {
                return BadRequest("Page index and page size must be greater than 0.");
            }
            var result = await _userService.GetUsersAdminTableAsync(pageIndex, pageSize);
            if (result == null || result.Results == null || !result.Results.Any())
            {
                result = new ResponseDatatable<UserDTO>(0, Enumerable.Empty<UserDTO>());
            }
            return Ok(result);
        }

        [HttpGet("admin/search")]
        public async Task<IActionResult> GetOwnersBySearch([FromQuery] string key, [FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
        {
            if (pageIndex < 1 || pageSize < 1)
            {
                return BadRequest("Page index and page size must be greater than 0.");
            }
            var result = await _userService.GetUsersAdminTableBySearchAsync(key, pageIndex, pageSize);
            if (result == null || result.Results == null || !result.Results.Any())
            {
                result = new ResponseDatatable<UserDTO>(0, Enumerable.Empty<UserDTO>());
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] UserResponseDTO user)
        {
            try
            {
                var createdUser = await _userService.CreateNewOneUserAsync(user);
                return CreatedAtAction(nameof(AddUser), new { id = createdUser.Id }, createdUser);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return StatusCode(500, e.Message);
            }
        }
    }
}
