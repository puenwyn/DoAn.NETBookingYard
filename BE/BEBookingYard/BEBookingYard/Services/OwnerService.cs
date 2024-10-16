using BEBookingYard.DTO;
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
        public IEnumerable<OwnerDTO> GetAll()
        {
            return _ownerRepository.GetAll();
        }
        public OwnerDTO GetOwnerById(int id)
        {
            return _ownerRepository.GetOwnerById(id);
        }

        public void AddOwner(Owner owner)
        {
            if (owner == null)
            {
                throw new ArgumentNullException(nameof(owner), "Owner cannot be null");
            }
            _ownerRepository.AddOwner(owner);
        }

        public void UpdateOwner(OwnerDTO ownerDTO)
        {
            if(ownerDTO == null)
            {
                throw new ArgumentNullException(nameof(ownerDTO), "Owner cannot be null");
            }
            _ownerRepository.UpdateOwner(ownerDTO);
        }
    }
}
