using Application.DTOs;
using Application.DTOs.OwnerDTOs;
using Application.Interfaces;
using Application.Utils;
using Domain.Abstract;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class VoucherService : IVoucherService
    {
        private readonly IUnitOfWork _unitOfWork;
        public VoucherService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Voucher> CreateNewOneVoucherAsync(Voucher voucher)
        {
            var voucherCreated = await _unitOfWork.VoucherRepository.CreateNewOneVoucher(voucher);
            return voucherCreated;
        }


        public async Task<ResponseDatatable<Voucher>> GetVouchersAdminTableAsync(int pageIndex, int pageSize = 10)
        {
            var (vouchers, totalRecords) = await _unitOfWork.VoucherRepository.GetVouchersAdminTableAsync(pageIndex, pageSize);
            return new ResponseDatatable<Voucher>(totalRecords, vouchers, pageSize);
        }

        public async Task<ResponseDatatable<Voucher>> GetVouchersBySearchAdminTableAsync(string keySearch, int pageIndex, int pageSize = 10)
        {
            var (vouchers, totalRecords) = await _unitOfWork.VoucherRepository.GetVouchersAdminTableBySearchAsync(keySearch, pageIndex, pageSize);
            return new ResponseDatatable<Voucher>(totalRecords, vouchers, pageSize);
        }
    }
}
