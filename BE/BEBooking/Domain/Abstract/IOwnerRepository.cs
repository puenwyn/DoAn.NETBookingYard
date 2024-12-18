using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IOwnerRepository
    {
        Task<(IEnumerable<Owner>, int totalRecords)> GetOwnersAdminTableAsync(int pageIndex, int pageSize = 10);
        Task<(IEnumerable<Owner>, int totalRecords)> GetOwnersAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10);
        Task<Owner?> GetOwnerByIdAsync(int id);
        Task<IEnumerable<Owner>> GetAllOwnersAsync();
        Task<Owner?> CreateNewOneOwer(Owner owner);
        Task<Owner> UpdateOneOwner(Owner owner);
    }
}
