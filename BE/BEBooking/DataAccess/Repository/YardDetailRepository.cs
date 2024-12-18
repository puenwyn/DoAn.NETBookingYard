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
    public class YardDetailRepository : GenericRepository<YardDetail>, IYardDetailRepository
    {
        public YardDetailRepository(BookingDbContext context) : base(context) { }

        public async Task<YardDetail> CreateNewOneYardDetail(YardDetail yardDetail)
        {
            await Create(yardDetail);
            await Commit();
            return yardDetail;
        }

        public async Task<YardDetail> GetYardDetailByIdAsync(int id)
        {
            var yardDetail = await GetSingleAsync(x => x.Id == id);
            return yardDetail;
        }

        public async Task<YardDetail> UpdateOneYardDetail(YardDetail yardDetail)
        {
            Update(yardDetail);
            await Commit();
            return yardDetail;
        }
    }
}
