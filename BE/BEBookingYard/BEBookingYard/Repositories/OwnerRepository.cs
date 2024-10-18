using BEBookingYard.Data;
using BEBookingYard.DTO;
using BEBookingYard.Models;
using BEBookingYard.Utils;

namespace BEBookingYard.Repositories
{
    public interface IOwnerRepository
    {
        IEnumerable<OwnerDTO> GetAll();
        OwnerDTO GetOwnerById(int id);
        void AddOwner(Owner owner);
        void UpdateOwner(OwnerDTO ownerDTO);
    }

    public class OwnerRepository : IOwnerRepository
    {
        private readonly ApplicationContext _applicationContext;
        public OwnerRepository(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public void AddOwner(Owner owner)
        {
            if(_applicationContext.Owners.Any(x => x.Username == owner.Username))
            {
                throw new Exception("Username already exists");
            }
            _applicationContext.Owners.Add(owner);
            _applicationContext.SaveChanges();
        }

        public IEnumerable<OwnerDTO> GetAll()
        {
            var owners = _applicationContext.Owners.ToList();
            return owners.Select(owner => new OwnerDTO
            {
                Id = owner.Id,
                Username = owner.Username,
                FullName = owner.FullName,
                DateOfBirth = owner.DateOfBirth,
                Address = owner.Address,
                PhoneNumber = owner.PhoneNumber,
                Gender = owner.Gender,
                IsLocked = owner.IsLocked
            });
        }

        public OwnerDTO? GetOwnerById(int id)
        {
            var owner = _applicationContext.Owners.FirstOrDefault(x => x.Id == id);
            if (owner == null)
            {
                return null;
            }
            return new OwnerDTO
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
        }

        public void UpdateOwner(OwnerDTO ownerDTO)
        {
            var existingOwner = _applicationContext.Owners.FirstOrDefault(x => x.Id == ownerDTO.Id);
            if(existingOwner == null)
            {
                throw new InvalidOperationException("Owner not found");
            }
            existingOwner.FullName = ownerDTO.FullName;
            existingOwner.DateOfBirth = ownerDTO.DateOfBirth;
            existingOwner.Address = ownerDTO.Address;
            existingOwner.PhoneNumber = ownerDTO.PhoneNumber;
            existingOwner.Gender = ownerDTO.Gender;
            existingOwner.IsLocked = ownerDTO.IsLocked;

            _applicationContext.SaveChanges();
        }
    }
}
