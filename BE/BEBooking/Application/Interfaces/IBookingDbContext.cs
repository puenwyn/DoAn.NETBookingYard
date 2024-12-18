using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IBookingDbContext
    {
        public DbSet<YardType> YardTypes { get; set; }
        public DbSet<Yard> Yards { get; set; }
        public DbSet<YardImage> YardImages { get; set; }
        public DbSet<YardDetail> YardDetails { get; set; }
        public DbSet<Amenity> Amenities { get; set; }
        public DbSet<AmenitiesOfYard> AmenitiesOfYard { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<Owner> Owners { get; set; }
        Task<int> SaveChangesAsync();
    }
}
