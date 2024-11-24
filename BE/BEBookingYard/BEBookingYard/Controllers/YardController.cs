using BEBookingYard.DTO;
using BEBookingYard.Models;
using BEBookingYard.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BEBookingYard.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class YardController : ControllerBase
    {
        private readonly YardService _yardService;

        public YardController(YardService yardService)
        {
            _yardService = yardService;
        }

        // Lấy danh sách tất cả các sân
        [HttpGet]
        public ActionResult<IEnumerable<YardDTO>> GetAllYards()
        {
            var yards = _yardService.GetAll();
            return Ok(yards);
        }

        // Lấy sân theo ID
        [HttpGet("{id}")]
        public ActionResult<YardDTO> GetYardById(int id)
        {
            var yard = _yardService.GetYardById(id);
            if (yard == null)
            {
                return NotFound();
            }
            return Ok(yard);
        }

        [HttpGet("{yardId}/details")]
        public ActionResult<IEnumerable<YardDetail>> GetYardDetails(int yardId)
        {
            var yardDetails = _yardService.GetYardDetailsByYardId(yardId);
            if (yardDetails == null || !yardDetails.Any())
            {
                return NotFound("No details found for the specified yard.");
            }
            return Ok(yardDetails);
        }

        [HttpPost("{yardId}/images")]
        public IActionResult UploadYardImages(int yardId, [FromBody] List<string> fileNames)
        {
            if (fileNames == null || fileNames.Count == 0)
            {
                return BadRequest("No file names were provided.");
            }

            var imageUrls = new List<string>(fileNames);

            _yardService.AddYardImages(yardId, imageUrls);

            return Ok(new { Message = "File names stored successfully.", ImageUrls = imageUrls });
        }

        [HttpDelete("images/{imageId}")]
        public IActionResult DeleteYardImage(int imageId)
        {
            try
            {
                _yardService.DeleteYardImage(imageId);
                return NoContent(); // 204 No Content response for successful deletion
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message); // Return 404 if the image is not found
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message); // Handle other exceptions
            }
        }

        [HttpPut("update-yard-detail/{id}")]
        public ActionResult UpdateYardDetail(int id, [FromBody] YardDetailDTO yardDetailDTO)
        {
            if (yardDetailDTO == null || yardDetailDTO.Id != id)
            {
                return BadRequest("Invalid yard detail data.");
            }

            try
            {
                _yardService.UpdateYardDetail(yardDetailDTO);
                return NoContent(); // Return 204 No Content on successful update
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message); // Return 404 Not Found if the yard detail is not found
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message); // Handle other exceptions
            }
        }

        [HttpDelete("details/{id}")]
        public ActionResult DeleteYardDetail(int id)
        {
            try
            {
                _yardService.DeleteYardDetail(id); // Call the service method
                return NoContent(); // Return 204 No Content on successful deletion
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message); // Return 404 Not Found if the yard detail is not found
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message); // Handle other exceptions
            }
        }

        // Thêm mới sân
        [HttpPost]
        public ActionResult<Yard> AddYard([FromBody] Yard yard)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _yardService.AddYard(yard);
                return CreatedAtAction(nameof(GetYardById), new { id = yard.Id }, yard);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // Cập nhật thông tin sân
        [HttpPut("{id}")]
        public ActionResult<YardDTO> UpdateYard(int id, [FromBody] Yard yard)
        {
            if (yard == null || yard.Id != id)
            {
                return BadRequest("Invalid yard data.");
            }

            try
            {
                var yardDTO = new YardDTO
                {
                    //Id = yard.Id,
                    Name = yard.Name,
                    NameTransformed = yard.NameTransformed,
                    Address = yard.Address,
                    Description = yard.Description,
                    //Owner = yard.Owner
                };
                _yardService.UpdateYard(yardDTO);
                return Ok(yardDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPost("add-yard-detail")]
        public IActionResult AddYardDetail([FromBody] YardDetail yardDetail)
        {
            if (yardDetail == null)
            {
                return BadRequest("Yard detail cannot be null.");
            }

            _yardService.AddYardDetail(yardDetail);
            return Ok("Yard detail added successfully.");
        }

        // Xóa sân theo ID (logic xóa mềm)
        //[HttpDelete("{id}")]
        //public IActionResult DeleteYard(int id)
        //{
        //    try
        //    {
        //        var success = _yardService.DeleteYard(id);
        //        if (!success)
        //        {
        //            return NotFound($"No yard found with ID {id}.");
        //        }
        //        return NoContent();
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Internal server error: " + ex.Message);
        //    }
        //}
    }
}
