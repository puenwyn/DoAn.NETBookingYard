using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class YardImageController : ControllerBase
    {
        private readonly IYardImageService _yardImageService;
        public YardImageController(IYardImageService yardImageService)
        {
            _yardImageService = yardImageService;
        }

        [HttpPost("admin")]
        public async Task<IActionResult> AddYardImage([FromBody] YardImage yardImage)
        {
            try
            {
                // Gọi service để tạo Owner
                var createdYardImage = await _yardImageService.CreateOneYardImageAsync(yardImage);
                return CreatedAtAction(nameof(AddYardImage), new { id = createdYardImage.Id }, createdYardImage);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpDelete("admin/{id}")]
        public async Task<IActionResult> DeleteYardImage(int id)
        {
            try
            {
                // Gọi service để tạo Owner
                var deletedYardImage = await _yardImageService.DeleteOneYardImageAsync(id);
                return CreatedAtAction(nameof(DeleteYardImage), new { id = deletedYardImage.Id }, deletedYardImage);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
