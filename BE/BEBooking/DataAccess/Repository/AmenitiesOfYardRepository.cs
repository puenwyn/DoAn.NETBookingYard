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
    public class AmenitiesOfYardRepository : GenericRepository<AmenitiesOfYard>, IAmenitiesOfYardRepository
    {
        public AmenitiesOfYardRepository(BookingDbContext context) : base(context) { }  
        public async Task<AmenitiesOfYard?> CreateNewOneAmenitiesOfYardAsync(AmenitiesOfYard amenitiesOfYard)
        {
            await Create(amenitiesOfYard);
            await Commit();
            return amenitiesOfYard;
        }
    }
}
