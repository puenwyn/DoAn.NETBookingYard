using Application.DTOs.OwnerDTOs;
using Application.DTOs;
using Application.Interfaces;
using Application.Services;
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class YardTypeController : ControllerBase
    {
        private readonly IYardTypeService _yardTypeService;
        public YardTypeController(IYardTypeService yardTypeService)
        {
            _yardTypeService = yardTypeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetYardTypes()
        {
            var yardTypes = await _yardTypeService.GetYardTypesAsync();
            return Ok(yardTypes);
        }
        [HttpGet("admin/search")]
        public async Task<IActionResult> GetYardTypes([FromQuery] string key)
        {
            var yardTypes = await _yardTypeService.GetYardTypesBySearchAsync(key);
            return Ok(yardTypes);
        }

        [HttpPost("admin")]
        public async Task<IActionResult> CreateNewOneYardType([FromBody] YardType yardType)
        {
            try
            {
                var createdYardType = await _yardTypeService.CreateNewOneYardTypeAsync(yardType);
                return CreatedAtAction(nameof(CreateNewOneYardType), new { id = createdYardType.Id }, createdYardType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("admin/{id}")]
        public async Task<IActionResult> UpdateOneYardType(int id, [FromBody] YardType yardType)
        {
            try
            {
                var updatedYardType = await _yardTypeService.UpdateOneYardTypeAsync(id, yardType);
                return updatedYardType == null ? NotFound($"Owner with id {id} not found") : Ok(updatedYardType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPatch("admin/{id}")]
        public async Task<IActionResult> DeleteOneYardType(int id)
        {
            try
            {
                var deletedYardType = await _yardTypeService.DeleteOneYardTypeByIdAsync(id);
                return deletedYardType == null ? NotFound($"Owner with id {id} not found") : Ok(deletedYardType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
