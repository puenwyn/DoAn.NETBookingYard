using DataAccess.DataAccess;
using Domain.Abstract;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class YardTypeRepository : GenericRepository<YardType>, IYardTypeRepository
    {
        public YardTypeRepository(BookingDbContext context) : base(context) { }

        public async Task<YardType?> CreateNewOneYardType(YardType yardType)
        {
            await Create(yardType);
            await Commit();
            return yardType;
        }

        public async Task<YardType?> GetYardTypeByIdAsync(int id)
        {
            var yardType = await GetSingleAsync(x => x.Id == id);
            return yardType;
        }

        public async Task<IEnumerable<YardType>> GetYardTypesAsync()
        {
            var yardTypes = await GetAllAsync(x => x.IsDelete == 0);
            return yardTypes;
        }

        public async Task<IEnumerable<YardType>> GetYardTypesBySearchAsync(string keySearch)
        {
            var yardTypes = await GetAllAsync(x => x.Name != null && x.Name.ToLower().Contains(keySearch.ToLower()) && x.IsDelete == 0);
            return yardTypes;
        }

        public async Task<YardType?> UpdateOneYardType(YardType yardType)
        {
            Update(yardType);
            await Commit();
            return yardType;
        }
    }
}
