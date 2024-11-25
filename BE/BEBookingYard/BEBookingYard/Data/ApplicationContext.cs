using BEBookingYard.Models;
using Microsoft.EntityFrameworkCore;

namespace BEBookingYard.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        public DbSet<Owner> Owners { get; set; }

        public DbSet<YardDetail> YardDetails { get; set; }

        public DbSet<Amenity> Amenities { get; set; }

    }
}
