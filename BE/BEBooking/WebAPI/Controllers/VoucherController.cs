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
    public class VoucherController : ControllerBase
    {
        private readonly IVoucherService _voucherService;
        public VoucherController(IVoucherService voucherService)
        {
            _voucherService = voucherService;
        }
        [HttpGet("admin")]
        public async Task<IActionResult> GetVouchers([FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
        {
            if (pageIndex < 1 || pageSize < 1)
            {
                return BadRequest("Page index and page size must be greater than 0.");
            }
            var result = await _voucherService.GetVouchersAdminTableAsync(pageIndex, pageSize);
            if (result == null || result.Results == null || !result.Results.Any())
            {
                result = new ResponseDatatable<Voucher>(0, Enumerable.Empty<Voucher>());
            }
            return Ok(result);
        }
        [HttpGet("admin/search")]
        public async Task<IActionResult> GetVouchersBySearch([FromQuery] string key, [FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
        {
            if (pageIndex < 1 || pageSize < 1)
            {
                return BadRequest("Page index and page size must be greater than 0.");
            }
            var result = await _voucherService.GetVouchersBySearchAdminTableAsync(key, pageIndex, pageSize);
            if (result == null || result.Results == null || !result.Results.Any())
            {
                result = new ResponseDatatable<Voucher>(0, Enumerable.Empty<Voucher>());
            }
            return Ok(result);
        }
        [HttpPost("admin")]
        public async Task<IActionResult> AddVoucher([FromBody] Voucher voucher)
        {
            try
            {
                // Gọi service để tạo Owner
                var createdVoucher = await _voucherService.CreateNewOneVoucherAsync(voucher);
                return CreatedAtAction(nameof(AddVoucher), new { id = createdVoucher.Id }, createdVoucher);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
