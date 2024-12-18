using Application.DTOs.OwnerDTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("/api/v1/[controller]")]
    public class AmenityController : ControllerBase
    {
        private readonly IAmenityService _amenityService;
        public AmenityController (IAmenityService amenityService)
        {
            _amenityService = amenityService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAmenities()
        {
            var amenities = await _amenityService.GetAllAmenitiesAsync();
            return Ok(amenities);
        }
    }
}
