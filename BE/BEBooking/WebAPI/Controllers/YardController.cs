using Application.DTOs.OwnerDTOs;
using Application.DTOs;
using Application.Interfaces;
using Application.Services;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.YardDTOs;
using Domain.Entities;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class YardController : ControllerBase
    {
        private readonly IYardService _yardService;
        public YardController(IYardService yardService) {
            _yardService = yardService;
        }

        [HttpGet("admin")]
        public async Task<IActionResult> GetYards([FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
        {
            if (pageIndex < 1 || pageSize < 1)
            {
                return BadRequest("Page index and page size must be greater than 0.");
            }
            var result = await _yardService.GetYardsAdminTableAsync(pageIndex, pageSize);
            if (result == null || result.Results == null || !result.Results.Any())
            {
                result = new ResponseDatatable<YardAdminTableDTO>(0, Enumerable.Empty<YardAdminTableDTO>());
            }
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetYardsClient([FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
        {
            if (pageIndex < 1 || pageSize < 1)
            {
                return BadRequest("Page index and page size must be greater than 0.");
            }
            var result = await _yardService.GetYardsClientAsync(pageIndex, pageSize);
            if (result == null || result.Results == null || !result.Results.Any())
            {
                result = new ResponseDatatable<YardClientDTO>(0, Enumerable.Empty<YardClientDTO>());
            }
            return Ok(result);
        }

        [HttpGet("admin/{id}")]
        public async Task<IActionResult> GetYardAdminByIdClient(int id)
        {
            try
            {
                var yard = await _yardService.GetYardDetailAdminById(id);
                return yard == null ? NotFound($"Yard with id {id} not found") : Ok(yard);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetYardClientByIdClient(int id)
        {
            try
            {
                var yard = await _yardService.GetYardDetailClientById(id);
                return yard == null ? NotFound($"Yard with id {id} not found") : Ok(yard);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("admin/search")]
        public async Task<IActionResult> GetYardsBySearch([FromQuery] string key, [FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
        {
            if (pageIndex < 1 || pageSize < 1)
            {
                return BadRequest("Page index and page size must be greater than 0.");
            }
            var result = await _yardService.GetYardsAdminTableBySearchAsync(key, pageIndex, pageSize);
            if (result == null || result.Results == null || !result.Results.Any())
            {
                result = new ResponseDatatable<YardAdminTableDTO>(0, Enumerable.Empty<YardAdminTableDTO>());
            }
            return Ok(result);
        }

        [HttpPost("admin")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateNewOneYard([FromForm] YardRequestDTO requestDTO)
        {
            try
            {
                var createdYard = await _yardService.CreateNewOneYardAsync(requestDTO);
                return Ok(createdYard);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
