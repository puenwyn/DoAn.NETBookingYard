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
    }
}
