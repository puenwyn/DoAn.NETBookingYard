using Application.DTOs.OwnerDTOs;
using Application.DTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OwnerController : ControllerBase
    {
        private readonly IOwnerService _ownerService;
        public OwnerController(IOwnerService ownerService)
        {
            _ownerService = ownerService;
        }

        [HttpGet("admin")]
        public async Task<IActionResult> GetOwners([FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
        {
            if (pageIndex < 1 || pageSize < 1)
            {
                return BadRequest("Page index and page size must be greater than 0.");
            }
            var result = await _ownerService.GetOwnersAdminTableAsync(pageIndex, pageSize);
            if (result == null || result.Results == null || !result.Results.Any())
            {
                result = new ResponseDatatable<OwnerAdminTableDTO>(0, Enumerable.Empty<OwnerAdminTableDTO>());
            }
            return Ok(result);
        }

        [HttpGet("admin/search")]
        public async Task<IActionResult> GetOwnersBySearch([FromQuery] string key,[FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
        {
            if (pageIndex < 1 || pageSize < 1)
            {
                return BadRequest("Page index and page size must be greater than 0.");
            }
            var result = await _ownerService.GetOwnersAdminTableBySearchAsync(key, pageIndex, pageSize);
            if (result == null || result.Results == null || !result.Results.Any())
            {
                result = new ResponseDatatable<OwnerAdminTableDTO>(0, Enumerable.Empty<OwnerAdminTableDTO>());
            }
            return Ok(result);
        }

        [HttpPut("admin/{id}/isLocked")]
        public async Task<IActionResult> UpdateIsLocked(int id)
        {
            try
            {
                var updatedOwner = await _ownerService.UpdateLockedAsync(id);
                if (updatedOwner == null)
                {
                    return NotFound($"Owner with id {id} not found.");
                }
                return Ok(updatedOwner);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("admin/select")]
        public async Task<IActionResult> GetOwnersSelect()
        {
            var owners = await _ownerService.GetOwnersSelectAsync();
            if (owners == null)
            {
                return Ok(Enumerable.Empty<OwnerSelectDTO>());
            }
            return Ok(owners);
        }
        [HttpPost("admin")]
        public async Task<IActionResult> AddOwner([FromBody] Owner owner)
        {
            try
            {
                // Gọi service để tạo Owner
                var createdOwner = await _ownerService.CreateNewOneOwnerAsync(owner);
                return CreatedAtAction(nameof(AddOwner), new { id = createdOwner.Id }, createdOwner);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpPut("admin/{id}")]
        public async Task<IActionResult> UpdateOwner(int id, [FromBody] Owner owner)
        {
            try
            {
                var updatedOwner = await _ownerService.UpdateOneOwnerAsync(id, owner);
                return owner == null ? NotFound($"Owner with id {id} not found") : Ok(owner);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("admin/{id}")]
        public async Task<IActionResult> GetOwnerById(int id)
        {
            try
            {
                var owner = await _ownerService.FindByOwnerIdAsync(id);
                return owner == null ? NotFound($"Owner with id {id} not found") : Ok(owner);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
