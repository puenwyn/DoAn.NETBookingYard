using Application.DTOs.BookingDTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IPaymentService _paymentService;

        public BookingController(IBookingService bookingService, IPaymentService paymentService)
        {
            _bookingService = bookingService;
            _paymentService = paymentService;
        }
        [HttpPost]
        public async Task<IActionResult> BookYard([FromBody] BookingDataDTO bookingDataDTO)
        {
            try
            {
                await _bookingService.CreateNewOneBookingAsync(bookingDataDTO);
                return StatusCode(201, "Oke");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET: api/Booking
        [HttpGet]
        public async Task<IActionResult> GetMyBookings([FromQuery] string id)
        {
            try
            {
                var myBookings = await _bookingService.GetMyBookings(id);
                return Ok(myBookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("history")]
        public async Task<IActionResult> GetMyHistoryBookings([FromQuery] string id)
        {
            try
            {
                var myHistory = await _paymentService.GetPaymentsByUserAsync(id);
                return Ok(myHistory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            bool isDeleted = false;
            try
            {
                await _bookingService.DeleteBooking(id);
                isDeleted = true;
                return Ok(isDeleted);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(isDeleted);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET: api/Booking/check-yard-status
        [HttpGet("check-yard-status")]
        public async Task<IActionResult> CheckYardStatus([FromQuery] int yardDetailId, [FromQuery] string start, [FromQuery] string end, [FromQuery] int newBookingId)
        {
            var startTime = DateTime.Parse(start);
            var endTime = DateTime.Parse(end);
            var status = await _bookingService.CheckYardStatusAsync(yardDetailId, startTime, endTime, newBookingId);
            return Ok(status);
        }

        [HttpGet("admin-view")]
        public async Task<IActionResult> GetBookings()
        {
            var bookingResponses = await _bookingService.GetBookingsAsync();
            return Ok(bookingResponses);
        }

        [HttpGet("get-yard-list-booking")]
        public async Task<IActionResult> GetYardListBooking([FromQuery] DateTime startTime)
        {
            if (startTime == DateTime.MinValue)
            {
                return BadRequest("Invalid start time provided.");
            }
            try
            {
                var result = await _bookingService.GetYardListBookingAsync(startTime);
                if (result == null || result.Count == 0)
                {
                    return NotFound("No bookings found for the given start time.");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
