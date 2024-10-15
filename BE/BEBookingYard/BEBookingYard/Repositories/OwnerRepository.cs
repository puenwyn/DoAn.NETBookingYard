using BEBookingYard.Data;
using BEBookingYard.Models;

namespace BEBookingYard.Repositories
{
    public interface IOwnerRepository
    {
        IEnumerable<Owner> GetAll();
        Owner GetOwnerById(int id);
    }

    public class OwnerRepository : IOwnerRepository
    {
        private readonly OwnerContext _ownerContext;
        public OwnerRepository(OwnerContext ownerContext)
        {
            _ownerContext = ownerContext;
        }
        public IEnumerable<Owner> GetAll()
        {
            return _ownerContext.Owners.ToList();
        }

        public Owner GetOwnerById(int id)
        {
            return _ownerContext.Owners.FirstOrDefault(x => x.Id == id);
        }
    }
}
