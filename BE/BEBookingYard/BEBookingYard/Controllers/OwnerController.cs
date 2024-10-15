using BEBookingYard.Models;
using BEBookingYard.Services;
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
        public ActionResult<IEnumerable<Owner>> GetAllOwners()
        {
            var owners = _ownerService.GetAll();
            return Ok(owners);
        }
        [HttpGet("{id}")]
        public ActionResult<Owner> GetOwnerById(int id) { 
            var owner = _ownerService.GetOwnerById(id);
            if (owner == null)
            {
                return NotFound();
            }
            return Ok(owner);
        }
    }
}
