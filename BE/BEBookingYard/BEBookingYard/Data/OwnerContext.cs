using BEBookingYard.Models;
using Microsoft.EntityFrameworkCore;

namespace BEBookingYard.Data
{
    public class OwnerContext : DbContext
    {
        public OwnerContext(DbContextOptions<OwnerContext> options) : base(options) { }

        public DbSet<Owner> Owners { get; set; }
    }
}
