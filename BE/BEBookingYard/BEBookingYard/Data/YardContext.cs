using BEBookingYard.Models;
using Microsoft.EntityFrameworkCore;

namespace BEBookingYard.Data
{
    public class YardContext : DbContext
    {
        public YardContext(DbContextOptions<YardContext> options) : base(options) { }
        public DbSet<Yard> Yards { get; set; }
    }
}
