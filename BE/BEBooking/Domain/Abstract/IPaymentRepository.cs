using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IPaymentRepository
    {
        Task<Payment> CreateNewOnePayment(Payment payment);
        Task<IEnumerable<Payment>> GetPaymentsByBookingIdsAsync(List<int> bookingIds);
        Task<Payment?> GetPaymentById(int id);
        Task DeleteAsync(Payment payment);
        Task<IEnumerable<Payment>> GetAllPayments();
        Task<List<Payment>> GetPaymentsByUserIdAsync(string userId);
    }
}
