using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IUnitOfWork : IDisposable
    {
        IOwnerRepository OwnerRepository { get; }
        IYardRepository YardRepository { get; }
        IAmenityRepository AmenityRepository { get; }
        IYardTypeRepository YardTypeRepository { get; }
        IYardImageRepository YardImageRepository { get; }
        IYardDetailRepository YardDetailRepository { get; }
        IAmenitiesOfYardRepository AmenitiesOfYardRepository { get; }
        IVoucherRepository VoucherRepository { get; }
        IUserRepository UserRepository { get; }
        IBookingRepository BookingRepository { get; }
        IPaymentRepository PaymentRepository { get; }
        Task SaveChangeAsync();
    }
}
