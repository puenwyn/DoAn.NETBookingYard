using Application.DTOs.BookingDTOs;
using Application.DTOs.YardDetailDTOs;
using Application.DTOs.YardDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IBookingService
    {
        Task CreateNewOneBookingAsync(BookingDataDTO bookingDataDTO);
        Task<IDictionary<int, List<BookingDTO>>> GetMyBookings(string userId);
        Task<IEnumerable<BookingResponse>> GetBookingsAsync();
        Task DeleteBooking(int id);
        Task<IDictionary<int, IEnumerable<YardDetailWithBookingDTO>>> GetYardListBookingAsync(DateTime startTime);
        Task<string> CheckYardStatusAsync(int yardDetailId, DateTime start, DateTime end, int newBookingId);
        Task CleanExpiredBookingsAsync();
    }
}
