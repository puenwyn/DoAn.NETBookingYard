using DataAccess.DataAccess;
using Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly BookingDbContext _bookingDbContext;
        private IOwnerRepository? _ownerRepository;
        private IYardRepository? _yardRepository;
        private IAmenityRepository? _amenityRepository;
        private IYardTypeRepository? _yardTypeRepository;
        private IYardImageRepository? _yardImageRepository;
        private IYardDetailRepository? _yardDetailRepository;
        private IAmenitiesOfYardRepository? _amenitiesOfYardRepository;
        private IVoucherRepository? _voucherRepository;
        private IUserRepository? _userRepository;
        private IBookingRepository? _bookingRepository;
        private IPaymentRepository? _paymentRepository;
        public UnitOfWork(BookingDbContext bookingDbContext)
        {
            _bookingDbContext = bookingDbContext;
        }

        public IOwnerRepository OwnerRepository => _ownerRepository ??= new OwnerRepository(_bookingDbContext);
        public IYardRepository YardRepository => _yardRepository ??= new YardRepository(_bookingDbContext);
        public IAmenityRepository AmenityRepository => _amenityRepository ??= new AmenityRepository(_bookingDbContext);
        public IYardTypeRepository YardTypeRepository => _yardTypeRepository ??= new YardTypeRepository(_bookingDbContext);
        public IYardImageRepository YardImageRepository => _yardImageRepository ??= new YardImageRepository(_bookingDbContext);
        public IYardDetailRepository YardDetailRepository => _yardDetailRepository ??= new YardDetailRepository(_bookingDbContext);
        public IAmenitiesOfYardRepository AmenitiesOfYardRepository => _amenitiesOfYardRepository ??= new AmenitiesOfYardRepository(_bookingDbContext);
        public IVoucherRepository VoucherRepository => _voucherRepository ??= new VoucherRepository(_bookingDbContext);
        public IUserRepository UserRepository => _userRepository ??= new UserRepository(_bookingDbContext);
        public IBookingRepository BookingRepository => _bookingRepository ??= new BookingRepository(_bookingDbContext);
        public IPaymentRepository PaymentRepository => _paymentRepository ??= new PaymentRepository(_bookingDbContext);
        public void Dispose()
        {
            _bookingDbContext?.Dispose();
        }
        public async Task SaveChangeAsync()
        {
            await _bookingDbContext.SaveChangesAsync();
        }
    }
}
