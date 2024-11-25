using BEBookingYard.DTO;
using BEBookingYard.Models;
using BEBookingYard.Services;
using Microsoft.AspNetCore.Mvc;

namespace BEBookingYard.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class YardTypeController : ControllerBase
    {
        private readonly YardTypeService _yardTypeService;

        public YardTypeController(YardTypeService yardTypeService)
        {
            _yardTypeService = yardTypeService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<YardType>> GetAllYardTypes()
        {
            var yard_types = _yardTypeService.GetAllYardTypes();
            return Ok(yard_types);
        }

        [HttpGet("{id}")]
        public ActionResult<YardType> GetYardTypeById(int id)
        {
            var yard_type = _yardTypeService.GetYardTypeById(id);
            if (yard_type == null)
            {
                return NotFound();
            }
            return Ok(yard_type);
        }

        [HttpPost]
        public ActionResult<YardType> AddYardType([FromBody] YardType yard_type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _yardTypeService.AddYardType(yard_type);
                return CreatedAtAction(nameof(GetYardTypeById), new { id = yard_type.Id }, yard_type);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult<YardType> UpdateYardType(int id, [FromBody] YardType yardType)
        {
            if (yardType == null || yardType.Id != id)
            {
                return BadRequest("Invalid data");
            }
            try
            {
                _yardTypeService.UpdateYardType(yardType);
                return Ok(yardType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<YardType>> GetYardTypesByName([FromQuery] string name)
        {
            return Ok(_yardTypeService.GetYardTypesByName(name));
        }
    }
}
