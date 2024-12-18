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
    public class AmenityRepository : GenericRepository<Amenity>, IAmenityRepository
    {
        public AmenityRepository(BookingDbContext context) : base(context) { }

        public Task<IEnumerable<Amenity>> GetAllAmenitiesAsync()
        {
            return GetAllAsync(x => true);
        }

        public async Task<Amenity?> GetAmenityByIdAsync(int id)
        {
            var amenity = await GetSingleAsync(x => x.Id == id);
            return amenity;
        }
    }
}
