using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BEBookingYard.Data;
using BEBookingYard.Models;
using BEBookingYard.Services;
using BEBookingYard.DTO;

namespace BEBookingYard.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]

    public class YardsController : ControllerBase
    {
        private readonly YardService _yardService;

        public YardsController(YardService yardService)
        { 
            _yardService = yardService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<YardDTO>> GetAllYards()
        {
            var yards = _yardService.GetAll();
            return Ok(yards);
        }
        [HttpGet("{id}")]
        public ActionResult<YardDTO> GetYardById(int id)
        {
            var yard = _yardService.GetById(id);
            return Ok(yard);
        }

        [HttpPost]
        public ActionResult<Yard> AddYard([FromBody] Yard yard)
        {
            // Kiểm tra tính hợp lệ của đối tượng Yard
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // Trả về lỗi 400 nếu dữ liệu không hợp lệ
            }


            
            try
            {
                // Thêm đối tượng Yard vào cơ sở dữ liệu
                _yardService.AddYard(yard);
                // Trả về mã 201 (Created) và đối tượng Yard mới được tạo
                return CreatedAtAction(nameof(GetYardById), new { id = yard.Id }, yard);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult<YardDTO> UpdateYard(int id, [FromBody] Yard yard)
        {
            if(yard.Id != id || yard == null)
            {
                return BadRequest("Invalid yard data.");
            }
            try
            {
                var yardDTO = new YardDTO
                {
                    Id = yard.Id,
                    YardType = yard.YardType,
                    Name = yard.Name,
                    NameTransformed = yard.NameTransformed,
                    Address = yard.Address,
                    Owner = yard.Owner,
                    Description = yard.Description,
                    isDelete = yard.IsDelete,
                };
                _yardService.UpdateYard(yardDTO);
                return Ok(yardDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteYard(int id)
        {
            try
            {
                var existingYard = this.GetYardById(id);
                if (existingYard == null)
                {
                    return NotFound();
                }
                _yardService.DeleteYard(id);
                return NoContent();
            }
            catch (Exception ex) 
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }

}
