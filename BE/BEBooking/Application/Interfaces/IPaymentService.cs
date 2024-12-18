using Application.DTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPaymentService
    {
        Task<Payment> CreateNewOnePaymentAsync(Payment payment);
        Task<MomoPaymentResponseDTO> InitiatePaymentAsync(float total, string paymentId);
        Task HandlePaymentFailedAsync(int paymentId);
        Task<bool> VerifySignatureAsync(IpNotificationRequest paramsData, string receivedSignature);
        Task<IEnumerable<Payment>> GetAllPayments();
        Task<List<Payment>> GetPaymentsByUserAsync(string userId);
    } 
}
