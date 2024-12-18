using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IUserRepository
    {
        bool ExistByUsername(string username);
        bool ExistByEmail(string email);
        Task<(IEnumerable<User>, int totalRecords)> GetUsersAdminTableAsync(int pageIndex, int pageSize = 10);
        Task<(IEnumerable<User>, int totalRecords)> GetUsersAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10);
    }
}
