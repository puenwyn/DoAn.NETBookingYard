using BEBookingYard.DTO;
using BEBookingYard.Models;
using BEBookingYard.Services;
using BEBookingYard.Utils;
using Microsoft.AspNetCore.Mvc;

namespace BEBookingYard.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OwnerController : ControllerBase
    {
        private readonly OwnerService _ownerService;
        public OwnerController(OwnerService ownerService)
        {
            _ownerService = ownerService;
        }
        [HttpGet]
        public ActionResult<IEnumerable<OwnerDTO>> GetAllOwners()
        {
            var owners = _ownerService.GetAll();
            return Ok(owners);
        }
        [HttpGet("{id}")]
        public ActionResult<OwnerDTO> GetOwnerById(int id)
        {
            var owner = _ownerService.GetOwnerById(id);
            if (owner == null)
            {
                return NotFound();
            }
            return Ok(owner);
        }
        [HttpPost]
        public ActionResult<Owner> AddOwner([FromBody] Owner owner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                owner.HashedPassword = HashPassword.HashedPassword(owner.HashedPassword);
                _ownerService.AddOwner(owner);
                return CreatedAtAction(nameof(GetOwnerById), new { id = owner.Id }, owner);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult<OwnerDTO> UpdateOwner(int id, [FromBody] Owner owner)
        {
            if (owner == null || owner.Id != id)
            {
                return BadRequest("Invalid owner data.");
            }
            try
            {
                var ownerDTO = new OwnerDTO
                {
                    Id = owner.Id,
                    Username = owner.Username,
                    FullName = owner.FullName,
                    DateOfBirth = owner.DateOfBirth,
                    Address = owner.Address,
                    PhoneNumber = owner.PhoneNumber,
                    Gender = owner.Gender,
                    IsLocked = owner.IsLocked
                };
                _ownerService.UpdateOwner(ownerDTO);
                return Ok(ownerDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
