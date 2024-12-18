using Application.DTOs.OwnerDTOs;
using Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IVoucherService
    {
        Task<ResponseDatatable<Voucher>> GetVouchersAdminTableAsync(int pageIndex, int pageSize = 10);
        Task<ResponseDatatable<Voucher>> GetVouchersBySearchAdminTableAsync(string keySearch, int pageIndex, int pageSize = 10);
        Task<Voucher> CreateNewOneVoucherAsync(Voucher voucher);
    }
}
