using BEBookingYard.Models;
using BEBookingYard.Repositories;

namespace BEBookingYard.Services
{
    public class OwnerService
    {
        private readonly IOwnerRepository _ownerRepository;
        public OwnerService(IOwnerRepository ownerRepository)
        {
            _ownerRepository = ownerRepository;
        }
        public IEnumerable<Owner> GetAll()
        {
            return _ownerRepository.GetAll();
        }

    }
}
