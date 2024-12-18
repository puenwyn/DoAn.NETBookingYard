using DataAccess.DataAccess;
using Domain.Abstract;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class YardRepository : GenericRepository<Yard>, IYardRepository
    {
        public YardRepository(BookingDbContext bookingDbContext) : base(bookingDbContext) { }

        public async Task<Yard?> CreateNewOneYardAsync(Yard yard)
        {
            await Create(yard);
            await Commit();
            return yard;
        }

        public async Task<Yard?> GetYardByIdAsync(int id)
        {
            var yard = await GetSingleAsync(x => x.Id == id, new List<Expression<Func<Yard, object>>>
                {
                    x => x.YardType,
                    x => x.YardDetails,
                    x => x.Owner,
                    x => x.YardImages,
                    x => x.AmenitiesOfYard
                });
            return yard;
        }

        public async Task<(IEnumerable<Yard>, int totalRecords)> GetYardsAdminTableAsync(int pageIndex, int pageSize = 10)
        {
            var skip = (pageIndex - 1) * pageSize;
            var take = pageSize;
            IEnumerable<Yard> yards = await GetAllAsync(x => x.IsDelete == 0,
                new List<Expression<Func<Yard, object>>>
                {
                    x => x.YardType,
                    x => x.YardDetails,
                    x => x.Owner,
                    x => x.YardImages
                });
            var totalRecords = yards.Count();
            yards = yards.Skip(skip)
                         .Take(take)
                         .OrderByDescending(x => x.Name);
            return (yards, totalRecords);
        }

        public async Task<(IEnumerable<Yard>, int totalRecords)> GetYardsAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10)
        {
            var skip = (pageIndex - 1) * pageSize;
            var take = pageSize;
            var normalizedKey = key.ToLower();
            Expression<Func<Yard, bool>> searchExpression = x =>
                (x.Name != null && x.Name.ToLower().Contains(normalizedKey)) ||
                (x.Address != null && x.Address.ToLower().Contains(normalizedKey)) ||
                (x.YardType != null && x.YardType.Name != null && x.YardType.Name.ToLower().Contains(normalizedKey));
            IEnumerable<Yard> yards = await GetAllAsync(searchExpression, new List<Expression<Func<Yard, object>>>
                {
                    x => x.YardType,
                    x => x.YardDetails,
                    x => x.Owner,
                    x => x.YardImages
                });
            var totalRecords = yards.Count();
            yards = yards.Skip(skip)
                         .Take(take)
                         .OrderByDescending(x => x.Name);
            return (yards, totalRecords);
        }

        public async Task<(IEnumerable<Yard>, int totalRecords)> GetYardsClientAsync(int pageIndex, int pageSize = 10)
        {
            var skip = (pageIndex - 1) * pageSize;
            var take = pageSize;
            IEnumerable<Yard> yards = await GetAllAsync(x => x.IsDelete == 0,
                new List<Expression<Func<Yard, object>>>
                {
                    x => x.YardType,
                    x => x.YardDetails,
                    x => x.Owner,
                    x => x.YardImages
                }); ;
            var totalRecords = yards.Count();
            yards = yards.Skip(skip)
                         .Take(take)
                         .OrderByDescending(x => x.Name);
            return (yards, totalRecords);
        }


    }
}
