using DataAccess.DataAccess;
using Domain.Abstract;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class VoucherRepository : GenericRepository<Voucher>, IVoucherRepository
    {   
        public VoucherRepository(BookingDbContext context) : base(context) { }
        public async Task<Voucher> CreateNewOneVoucher(Voucher voucher)
        {
            await Create(voucher);
            await Commit();
            return voucher;
        }

        public async Task<(IEnumerable<Voucher>, int totalRecords)> GetVouchersAdminTableAsync(int pageIndex, int pageSize = 10)
        {
            var skip = (pageIndex - 1) * pageSize;
            var take = pageSize;
            IEnumerable<Voucher> vouchers = await GetAllAsync(x => x.IsDelete == 0);
            var totalRecords = vouchers.Count();
            vouchers = vouchers.Skip(skip)
                         .Take(take)
                         .OrderByDescending(x => x.Name);
            return (vouchers, totalRecords);
        }

        public async Task<(IEnumerable<Voucher>, int totalRecords)> GetVouchersAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10)
        {
            var skip = (pageIndex - 1) * pageSize;
            var take = pageSize;
            var normalizedKey = key.ToLower();
            Expression<Func<Voucher, bool>> searchExpression = x =>
                (x.Name != null && x.Name.ToLower().Contains(normalizedKey));
            var vouchers = await GetAllAsync(searchExpression);
            var totalRecords = vouchers.Count();
            vouchers = vouchers
                .OrderByDescending(x => x.Name)
                .Skip(skip)
                .Take(take);
            return (vouchers, totalRecords);
        }
    }
}
