using DataAccess.DataAccess;
using Domain.Abstract;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class PaymentRepository : GenericRepository<Payment>, IPaymentRepository
    {
        private readonly BookingDbContext _bookingDBContext;
        public PaymentRepository(BookingDbContext bookingDbContext) : base(bookingDbContext)
        {
            _bookingDBContext = bookingDbContext;
        }
        public async Task<Payment> CreateNewOnePayment(Payment payment)
        {
            await Create(payment);
            await Commit();
            return payment;
        }

        public async Task DeleteAsync(Payment payment)
        {
            Delete(payment);
            await Commit();
        }

        public async Task<IEnumerable<Payment>> GetAllPayments()
        {
            var payments = await GetAllAsync(x => x.IsDelete == 0);
            return payments;
        }

        public async Task<Payment?> GetPaymentById(int id)
        {
            var payment = await GetSingleAsync(x => x.Id == id);
            return payment;
        }

        public async Task<IEnumerable<Payment>> GetPaymentsByBookingIdsAsync(List<int> bookingIds)
        {
            // Create a HashSet to store unique payments
            var payments = new HashSet<Payment>();

            // Get all payments that are not deleted
            var paymentsTmp = await GetAllAsync(x => x.IsDelete == 0,
                new List<Expression<Func<Payment, object>>>
                {
                    x => x.Voucher
                });

            // Loop through each bookingId
            foreach (var id in bookingIds)
            {
                // Loop through each payment
                foreach (var payment in paymentsTmp)
                {
                    // If the payment contains the current bookingId (converted to string)
                    if (payment.BookingIds.Contains(id.ToString()))
                    {
                        // Add payment to the HashSet (ensures no duplicates)
                        payments.Add(payment);
                        break;
                    }
                }
            }

            // Return the unique payments
            return payments;
        }

        public async Task<List<Payment>> GetPaymentsByUserIdAsync(string userId)
        {
            // Lấy danh sách bookingIds từ cơ sở dữ liệu
            var bookingIds = await _bookingDBContext.Bookings
                .Where(b => b.UserId == userId && b.IsDelete == 0)
                .Select(b => b.Id.ToString())
                .ToListAsync();

            // Lấy tất cả các payment từ cơ sở dữ liệu
            var payments = await _bookingDBContext.Payments
                .Where(p => p.IsDelete == 0)
                .ToListAsync();

            // Lọc các payment liên quan đến bookingIds
            var filteredPayments = payments.Where(p =>
            {
                if (string.IsNullOrEmpty(p.BookingIds)) return false;

                // Phân tách BookingIds thành danh sách
                var bookingIdList = p.BookingIds
                    .Split(',')
                    .Select(id => id.Trim()) // Loại bỏ khoảng trắng
                    .ToList();

                // Kiểm tra nếu có bất kỳ bookingId nào trùng khớp
                return bookingIdList.Any(id => bookingIds.Contains(id));
            }).ToList();

            return filteredPayments;
        }

    }
}
