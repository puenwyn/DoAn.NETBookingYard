using Application.DTOs.BookingDTOs;
using Application.DTOs.YardDetailDTOs;
using Application.DTOs.YardDTOs;
using Application.Interfaces;
using Domain.Abstract;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class BookingService : IBookingService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;

        public BookingService(IUnitOfWork unitOfWork, UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        public async Task CreateNewOneBookingAsync(BookingDataDTO bookingDataDTO)
        {
            var user = await _userManager.FindByIdAsync(bookingDataDTO.User.Id) ?? throw new KeyNotFoundException("User not found");
            var yardDetail = await _unitOfWork.YardDetailRepository.GetYardDetailByIdAsync(bookingDataDTO.Yard.Id) ?? throw new KeyNotFoundException("Yard not found");

            var formatter = "d/M/yyyy HH:mm"; // Điều chỉnh để hỗ trợ cả ngày/tháng có 1 chữ số
            foreach (var time in bookingDataDTO.Times)
            {
                // Phân tách startTime và endTime
                var timeParts = time.Time.Split(" - ");
                var startTimeStr = timeParts[0]; // Ví dụ: "25/11/2024 12:00"
                var endTimeStr = timeParts[1];
                var dateStr = time.Id.Split(" ")[2]; // Lấy ngày từ ID (ví dụ: "25/11/2024")

                startTimeStr = $"{dateStr} {startTimeStr}"; // Ví dụ: "25/11/2024 02:00"
                endTimeStr = $"{dateStr} {endTimeStr}";

                // Sử dụng TryParseExact để tránh lỗi và hỗ trợ các định dạng ngày/tháng khác nhau
                DateTime startTime;
                DateTime endTime;

                bool isStartValid = DateTime.TryParseExact(startTimeStr, formatter, CultureInfo.InvariantCulture, DateTimeStyles.None, out startTime);
                bool isEndValid = DateTime.TryParseExact(endTimeStr, formatter, CultureInfo.InvariantCulture, DateTimeStyles.None, out endTime);

                if (!isStartValid || !isEndValid)
                {
                    throw new FormatException("Ngày giờ không hợp lệ.");
                }

                // Tạo và lưu booking
                var booking = new Booking
                {
                    User = user,
                    YardDetail = yardDetail,
                    StartTime = startTime,
                    EndTime = endTime,
                    Status = "Đang chờ",  // Trạng thái ban đầu
                    Note = $"Name:{bookingDataDTO.Name}, Email:{bookingDataDTO.Email}, Phone:{bookingDataDTO.Phone}, Note:{bookingDataDTO.Detail}",
                    QRCode = "" // Nếu cần mã QR, bạn có thể thêm logic ở đây
                };

                await _unitOfWork.BookingRepository.CreateNewOneBookingAsync(booking);
            }
        }

        public async Task<IDictionary<int, List<BookingDTO>>> GetMyBookings(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId) ?? throw new KeyNotFoundException("User not found");
            var bookings = await _unitOfWork.BookingRepository.GetBookingsByUserIdAsync(userId);
            var result = bookings
                .GroupBy(b => b.YardDetail.Yard.Id)
                .ToDictionary(g => g.Key, g => g.Select(b => new BookingDTO
                {
                    Id = b.Id,
                    YardDetail = b.YardDetail,
                    StartTime = b.StartTime,
                    EndTime = b.EndTime,
                    Status = b.Status,
                    Note = b.Note
                }).ToList());

            return result;
        }

        public async Task<string> CheckYardStatusAsync(int yardDetailId, DateTime start, DateTime end, int newBookingId)
        {
            var bookings = await _unitOfWork.BookingRepository.GetBookingsByYardDetailIdAsync(yardDetailId);
            foreach (var booking in bookings)
            {
                if (booking.Id == newBookingId)
                    continue;

                if (start < booking.EndTime && end > booking.StartTime)
                {
                    return booking.Status;
                }
            }
            return "Trống";
        }

        public async Task DeleteBooking(int id)
        {
            var booking = await _unitOfWork.BookingRepository.GetBookingByIdAsync(id) ?? throw new KeyNotFoundException("Booking not found.");
            if (booking is not null)
            {
                await _unitOfWork.BookingRepository.DeleteOneBookingAsync(booking);
            }
        }

        public async Task CleanExpiredBookingsAsync()
        {
            var currentTime = DateTime.Now;
            var expiredBookings = await _unitOfWork.BookingRepository.FindByStatusAndStartTimeBeforeAsync("Đang chờ", currentTime);

            foreach (var booking in expiredBookings)
            {
                await _unitOfWork.BookingRepository.DeleteOneBookingAsync(booking);
            }
        }

        public async Task<IEnumerable<BookingResponse>> GetBookingsAsync()
        {
            var bookings = await _unitOfWork.BookingRepository.GetBookings();
            var bookingResponses = new List<BookingResponse>();

            var dateFormatter = "yyyy-MM-dd";  // Define your custom format
            var timeFormatter = "HH:mm";  // Define your custom format

            foreach (var booking in bookings)
            {
                // Skip bookings with "Đang chờ" status
                if (booking.Status.Trim().Equals("Đang chờ", StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                var bookingResponse = new BookingResponse
                {
                    Date = booking.StartTime?.ToString(dateFormatter),
                    Start = booking.StartTime?.ToString(timeFormatter),
                    End = booking.EndTime?.ToString(timeFormatter),
                    Status = booking.Status.Contains("Đã được đặt", StringComparison.OrdinalIgnoreCase) ? "pending" : "booked"
                };

                bookingResponses.Add(bookingResponse);
            }

            return bookingResponses;
        }

        public async Task<IDictionary<int, IEnumerable<YardDetailWithBookingDTO>>> GetYardListBookingAsync(DateTime startTime)
        {
            var yardDetailsMap = new Dictionary<int, List<YardDetailWithBookingDTO>>(); // Dùng List để dễ dàng thêm phần tử
            var bookings = await _unitOfWork.BookingRepository.GetBookingsByStartTime(startTime);

            foreach (var booking in bookings)
            {
                var yardId = booking.YardDetail.Yard.Id;
                var bookingYardDetail = new BookingYardDetailDTO
                {
                    Id = booking.Id,
                    UserId = booking.UserId,
                    Status = booking.Status
                };
                var yardDetail = new YardDetailWithBookingDTO
                {
                    Id = booking.YardDetail.Id,
                    Name = booking.YardDetail.Name,
                    Location = booking.YardDetail.Location,
                    Description = booking.YardDetail.Description,
                    Capacity = booking.YardDetail.Capacity,
                    Price = booking.YardDetail.Price,
                    PricePeak = booking.YardDetail.PricePeak,
                    IsDelete = booking.IsDelete,
                    Booking = bookingYardDetail
                };
                if (!yardDetailsMap.ContainsKey(yardId))
                {
                    yardDetailsMap[yardId] = new List<YardDetailWithBookingDTO>();
                }
                yardDetailsMap[yardId].Add(yardDetail);
            }
            var result = yardDetailsMap.ToDictionary(
                kvp => kvp.Key,
                kvp => (IEnumerable<YardDetailWithBookingDTO>)kvp.Value
            );

            return result;
        }
    }
}
