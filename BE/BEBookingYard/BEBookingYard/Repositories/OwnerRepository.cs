using BEBookingYard.Data;
using BEBookingYard.Models;

namespace BEBookingYard.Repositories
{
    public interface IOwnerRepository
    {
        IEnumerable<Owner> GetAll();
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
    }
}
