using BEBookingYard.DTO;
using BEBookingYard.Models;
using BEBookingYard.Services;
using Microsoft.AspNetCore.Mvc;

namespace BEBookingYard.Controllers
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

        // Lấy danh sách tất cả các sân không bị xóa
        [HttpGet]
        public ActionResult<IEnumerable<YardDetailDTO>> GetAllYardDetails()
        {
            var yardDetails = _yardDetailService.GetAllYardDetails();
            return Ok(yardDetails);
        }

        // Lấy chi tiết sân theo ID
        [HttpGet("{id}")]
        public ActionResult<YardDetailDTO> GetYardDetailById(int id)
        {
            var yardDetail = _yardDetailService.GetYardDetailById(id);
            if (yardDetail == null)
            {
                return NotFound();
            }
            return Ok(yardDetail);
        }

        // Thêm sân mới
        [HttpPost]
        public ActionResult<YardDetail> AddYardDetail([FromBody] YardDetail yardDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _yardDetailService.AddYardDetail(yardDetail);
                return CreatedAtAction(nameof(GetYardDetailById), new { id = yardDetail.Id }, yardDetail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // Cập nhật thông tin sân
        [HttpPut("{id}")]
        public ActionResult UpdateYardDetail(int id, [FromBody] YardDetail yardDetail)
        {
            if (yardDetail == null || yardDetail.Id != id)
            {
                return BadRequest("Invalid yard detail data.");
            }
            try
            {
                var yardDetailDTO = new YardDetailDTO
                {
                    YardId = yardDetail.YardId,
                    Name = yardDetail.Name,
                    Location = yardDetail.Location,
                    Description = yardDetail.Description,
                    Capacity = yardDetail.Capacity,
                    Price = yardDetail.Price,
                    PricePeak = yardDetail.PricePeak,
                    IsDelete = yardDetail.IsDelete,
                };
                _yardDetailService.UpdateYardDetail(yardDetailDTO);
                return Ok(yardDetailDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // Xóa sân (đánh dấu là xóa)
        [HttpDelete("{id}")]
        public ActionResult DeleteYardDetail(int id)
        {
            try
            {
                var existingYardDetail = _yardDetailService.GetYardDetailById(id);
                if (existingYardDetail == null)
                {
                    return NotFound();
                }
                _yardDetailService.DeleteYardDetail(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
