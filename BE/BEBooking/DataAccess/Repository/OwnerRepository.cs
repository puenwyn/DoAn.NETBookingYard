using DataAccess.DataAccess;
using Domain.Abstract;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static System.Reflection.Metadata.BlobBuilder;

namespace DataAccess.Repository
{
    public class OwnerRepository : GenericRepository<Owner>, IOwnerRepository
    {
        public OwnerRepository(BookingDbContext bookingDbContext) : base(bookingDbContext) { }

        public async Task<IEnumerable<Owner>> GetAllOwnersAsync()
        {
            return await GetAllAsync(x => true);
        }

        public async Task<Owner?> GetOwnerByIdAsync(int id)
        {
            var owner = await GetSingleAsync(x => x.Id == id);
            return owner;
        }

        public async Task<Owner?> CreateNewOneOwer(Owner owner)
        {
            await Create(owner);
            await Commit();
            return owner;
        }

        public async Task<(IEnumerable<Owner>, int)> GetOwnersAdminTableAsync(int pageIndex, int pageSize = 10)
        {
            var skip = (pageIndex - 1) * pageSize;
            var take = pageSize;
            IEnumerable<Owner> owners = await GetAllAsync(x => true);
            var totalRecords = owners.Count();
            owners = owners.Skip(skip)
                         .Take(take)
                         .OrderByDescending(x => x.FullName);
            return (owners, totalRecords);
        }

        public async Task<Owner> UpdateOneOwner(Owner owner)
        {
            Update(owner);
            await Commit();
            return owner;
        }

        public async Task<(IEnumerable<Owner>, int totalRecords)> GetOwnersAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10)
        {
            var skip = (pageIndex - 1) * pageSize;
            var take = pageSize;
            var normalizedKey = key.ToLower();
            Expression<Func<Owner, bool>> searchExpression = x =>
                (x.FullName != null && x.FullName.ToLower().Contains(normalizedKey)) ||
                (x.Address != null && x.Address.ToLower().Contains(normalizedKey));
            var owners = await GetAllAsync(searchExpression);
            var totalRecords = owners.Count();
            owners = owners.Skip(skip)
                           .Take(take)
                           .OrderByDescending(x => x.FullName);

            return (owners, totalRecords);
        }
    }
}
