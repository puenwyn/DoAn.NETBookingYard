
using BEBookingYard.DTO;
using BEBookingYard.Models;
using Microsoft.EntityFrameworkCore;

public class YardContext : DbContext
{
    public YardContext(DbContextOptions<YardContext> options) : base(options) { }
    public DbSet<YardDetail> YardDetail { get; set; }
    public DbSet<Yard> Yards { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<YardDetail>()
            .Property(y => y.Price)
            .HasColumnType("float");

        modelBuilder.Entity<YardDetail>()
            .Property(y => y.PricePeak)
            .HasColumnType("float");
    }
    public DbSet<YardImage> YardImage { get; set; }

