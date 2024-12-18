using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IBookingRepository
    {
        Task<Booking?> CreateNewOneBookingAsync(Booking booking);
        Task<IEnumerable<Booking>> GetBookingsByUserIdAsync(string userId);
        Task<IEnumerable<Booking>> GetBookingsByYardDetailIdAsync(int yardDetaiId);
        Task<IEnumerable<Booking>> GetBookings();
        Task<IEnumerable<Booking>> GetBookingsByStartTime(DateTime startTime);
        Task<Booking?> GetBookingByIdAsync(int id);
        Task<Booking?> DeleteOneBookingAsync(Booking booking);
        Task<IEnumerable<Booking>> FindByStatusAndStartTimeBeforeAsync(string status, DateTime startTime);
        Task<Booking> UpdateBookingAsync(Booking booking);
    }
}
