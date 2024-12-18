using DataAccess.DataAccess;
using Domain.Abstract;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class BookingRepository : GenericRepository<Booking>, IBookingRepository
    {
        private readonly BookingDbContext bookingDbContext1;
        public BookingRepository(BookingDbContext bookingDbContext) : base(bookingDbContext)
        {
            bookingDbContext1 = bookingDbContext;
        }

        public async Task<Booking?> CreateNewOneBookingAsync(Booking booking)
        {
            await Create(booking);
            await Commit();
            return booking;
        }



        public async Task<Booking?> DeleteOneBookingAsync(Booking booking)
        {
            Delete(booking);
            await Commit();
            return booking;
        }

        public async Task<IEnumerable<Booking>> FindByStatusAndStartTimeBeforeAsync(string status, DateTime startTime)
        {
            var bookings = await GetAllAsync(b => b.Status == status && b.StartTime < startTime);
            return bookings;
        }

        public async Task<Booking?> GetBookingByIdAsync(int id)
        {
            var booking = await GetSingleAsync(x => x.Id == id);
            return booking;
        }

        public async Task<IEnumerable<Booking>> GetBookings()
        {
            var bookings = await GetAllAsync(x => x.IsDelete == 0 && x.Status != "Đang chờ");
            return bookings;
        }

        public async Task<IEnumerable<Booking>> GetBookingsByStartTime(DateTime startTime)
        {
            var bookings = await GetAllAsync(x => x.StartTime == startTime && x.IsDelete == 0 && x.Status != "Đang chờ",
                new List<Expression<Func<Booking, object>>>
                {
                    x => x.YardDetail.Yard,
                } );
            return bookings;
        }

        public async Task<IEnumerable<Booking>> GetBookingsByUserIdAsync(string userId)
        {
            var bookings = await GetAllAsync(x => x.UserId == userId, 
                new List<Expression<Func<Booking, object>>>
                {
                    x => x.YardDetail.Yard,
                });
            return bookings;
        }

        public async Task<IEnumerable<Booking>> GetBookingsByYardDetailIdAsync(int yardDetaiId)
        {
            var bookings = await GetAllAsync(x => x.YardDetailId == yardDetaiId, 
                new List<Expression<Func<Booking, object>>>
                {
                    x => x.YardDetail,
                });
            return bookings;
        }

        public async Task<Booking> UpdateBookingAsync(Booking booking)
        {
            Update(booking);
            await Commit();
            return booking;
        }
    }
}
