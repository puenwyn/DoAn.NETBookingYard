using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IVoucherRepository
    {
        Task<(IEnumerable<Voucher>, int totalRecords)> GetVouchersAdminTableAsync(int pageIndex, int pageSize = 10);
        Task<(IEnumerable<Voucher>, int totalRecords)> GetVouchersAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10);
        Task<Voucher> CreateNewOneVoucher(Voucher voucher);
    }
}
