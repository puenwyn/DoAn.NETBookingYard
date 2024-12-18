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
    public class YardImageRepository : GenericRepository<YardImage>, IYardImageRepository
    {
        public YardImageRepository(BookingDbContext context) : base(context) { }

        public async Task<YardImage?> CreateNewOneYardImageAsync(YardImage yardImage)
        {
            await Create(yardImage);
            await Commit();
            return yardImage;
        }

        public async Task<YardImage?> DeleteOneYardImageAsync(YardImage yardImage)
        {
            Delete(yardImage);
            await Commit();
            return yardImage;
        }

        public Task<YardImage?> GetYardImageByIdAsync(int id)
        {
            var yardImage = GetSingleAsync(x => x.Id == id);
            return yardImage;
        }
    }
}
