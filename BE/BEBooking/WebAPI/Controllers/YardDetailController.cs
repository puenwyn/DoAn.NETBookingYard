using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class YardDetailController : ControllerBase
    {
        private readonly IYardDetailService _yardDetailService;
        public YardDetailController(IYardDetailService yardDetailService)
        {
            _yardDetailService = yardDetailService;
        }

        [HttpPut("admin/{id}/isLocked")]
        public async Task<IActionResult> UpdateIsLocked(int id)
        {
            try
            {
                var updatedYardDetail = await _yardDetailService.UpdateLockedAsync(id);
                if (updatedYardDetail == null)
                {
                    return NotFound($"YardDetail with id {id} not found.");
                }
                return Ok(updatedYardDetail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("admin")]
        public async Task<IActionResult> AddYardDetail([FromBody] YardDetail yardDetail)
        {
            try
            {
                // Gọi service để tạo Owner
                var createdYardDetail = await _yardDetailService.CreateOneNewYardDetail(yardDetail);
                return CreatedAtAction(nameof(AddYardDetail), new { id = createdYardDetail.Id }, createdYardDetail);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpPut("admin/{id}")]
        public async Task<IActionResult> UpdateYardDetail(int id, [FromBody] YardDetail yardDetail)
        {
            try
            {
                var createdYardDetail = await _yardDetailService.UpdateOneYardDetail(id, yardDetail);
                return createdYardDetail == null ? NotFound($"Owner with id {id} not found") : Ok(createdYardDetail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
