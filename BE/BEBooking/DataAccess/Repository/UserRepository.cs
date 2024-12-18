using DataAccess.DataAccess;
using Domain.Abstract;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly BookingDbContext _bookingDbContext;
        public UserRepository(BookingDbContext bookingDbContext) : base(bookingDbContext)
        {
            _bookingDbContext = bookingDbContext;
        }

        public bool ExistByEmail(string email)
        {
            return _bookingDbContext.Users.Any(u => u.Email == email);
        }

        public bool ExistByUsername(string username)
        {
            return _bookingDbContext.Users.Any(u => u.UserName == username);
        }

        public async Task<(IEnumerable<User>, int totalRecords)> GetUsersAdminTableAsync(int pageIndex, int pageSize = 10)
        {
            var skip = (pageIndex - 1) * pageSize;
            var take = pageSize;
            IEnumerable<User> users = await GetAllAsync(x => true);
            var totalRecords = users.Count();
            users = users.Skip(skip)
                         .Take(take)
                         .OrderByDescending(x => x.FullName);
            return (users, totalRecords);
        }

        public async Task<(IEnumerable<User>, int totalRecords)> GetUsersAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10)
        {
            var skip = (pageIndex - 1) * pageSize;
            var take = pageSize;
            IEnumerable<User> users = await GetAllAsync(x => true);
            var totalRecords = users.Count();
            users = users.Skip(skip)
                         .Take(take)
                         .OrderByDescending(x => x.FullName);
            return (users, totalRecords);
        }
    }
}
