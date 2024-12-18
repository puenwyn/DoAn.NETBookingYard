using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace DataAccess.DataAccess
{
    public class BookingDbContext : IdentityDbContext<User, IdentityRole, string>, IBookingDbContext
    {
        public BookingDbContext(DbContextOptions options) : base(options) { }
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

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Mối quan hệ giữa Owner và Yard: 1-N
            modelBuilder.Entity<Yard>()
                .HasOne(y => y.Owner)
                .WithMany(o => o.Yards)
                .HasForeignKey(y => y.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);

            // Mối quan hệ giữa YardType và Yard: 1-1
            modelBuilder.Entity<Yard>()
                .HasOne(y => y.YardType)
                .WithMany(yt => yt.Yards)
                .HasForeignKey(y => y.YardTypeId)
                .OnDelete(DeleteBehavior.SetNull);

            // Mối quan hệ giữa Yard và YardImage: 1-N
            modelBuilder.Entity<YardImage>()
                .HasOne(yi => yi.Yard)
                .WithMany(y => y.YardImages)
                .HasForeignKey(yi => yi.YardId)
                .OnDelete(DeleteBehavior.Cascade);

            // Mối quan hệ giữa Yard và YardDetail: 1-N
            modelBuilder.Entity<YardDetail>()
                .HasOne(yd => yd.Yard)
                .WithMany(y => y.YardDetails)
                .HasForeignKey(yd => yd.YardId)
                .OnDelete(DeleteBehavior.Cascade);

            // Mối quan hệ giữa Amenity và Yard: N-N
            modelBuilder.Entity<AmenitiesOfYard>()
                .HasKey(aoy => new { aoy.YardId, aoy.AmenityId });

            // Mối quan hệ giữa Amenity và AmenityOfYard
            modelBuilder.Entity<AmenitiesOfYard>()
                .HasOne(aoy => aoy.Amenity)
                .WithMany(a => a.AmenitiesOfYard)
                .HasForeignKey(aoy => aoy.AmenityId);

            // Mối quan hệ giữa Yard và AmenityOfYard
            modelBuilder.Entity<AmenitiesOfYard>()
                .HasOne(aoy => aoy.Yard)
                .WithMany(a => a.AmenitiesOfYard)
                .HasForeignKey(aoy => aoy.YardId);

            // Mối quan hệ giữa User và Booking: 1-N
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Mối quan hệ giữa YardDetail và Booking: 1-N
            modelBuilder.Entity<Booking>()
               .HasOne(b => b.YardDetail)
               .WithMany(yd => yd.Bookings)
               .HasForeignKey(b => b.YardDetailId)
               .OnDelete(DeleteBehavior.Cascade);

            // Mối quan hệ giữa User và Rating: 1-N
            modelBuilder.Entity<Rating>()
                .HasOne(r => r.User)
                .WithMany(u => u.Ratings)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Mối quan hệ giữa Yard và Rating: 1-N
            modelBuilder.Entity<Rating>()
                .HasOne(r => r.Yard)
                .WithMany(y => y.Ratings)
                .HasForeignKey(r => r.YardId)
                .OnDelete(DeleteBehavior.Cascade);

            // Mối quan hệ Yard và User: N-N thông qua Wishlist
            modelBuilder.Entity<Wishlist>()
                .HasKey(w => new { w.YardId, w.UserId });

            // Mối quan hệ giữa User và Wishlist: 1-N
            modelBuilder.Entity<Wishlist>()
                .HasOne(w => w.User)
                .WithMany(u => u.Wishlists)
                .HasForeignKey(w => w.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Mối quan hệ giữa Yard và Wishlist: 1-N
            modelBuilder.Entity<Wishlist>()
                .HasOne(w => w.Yard)
                .WithMany(y => y.Wishlists)
                .HasForeignKey(w => w.YardId)
                .OnDelete(DeleteBehavior.Cascade);

            // Mối quan hệ giữa Rating và RatingPrev: 1-N
            modelBuilder.Entity<Rating>()
                .HasOne(r => r.RatingPrev)
                .WithMany()
                .HasForeignKey(r => r.RatingId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRole");
            modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("UserClaim");
            modelBuilder.Entity<IdentityUserToken<string>>().ToTable("UserToken");

            base.OnModelCreating(modelBuilder);
        }
    }
}
