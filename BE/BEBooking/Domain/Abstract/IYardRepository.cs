using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IYardRepository
    {
        Task<(IEnumerable<Yard>, int totalRecords)> GetYardsAdminTableAsync(int pageIndex, int pageSize = 10);
        Task<(IEnumerable<Yard>, int totalRecords)> GetYardsAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10);
        Task<(IEnumerable<Yard>, int totalRecords)> GetYardsClientAsync(int pageIndex, int pageSize = 10);
        // Task<(IEnumerable<Yard>, int totalRecords)> GetYardsClientBySearchAsync(string key, int pageIndex, int pageSize = 10);
        Task<Yard?> GetYardByIdAsync(int id);
        Task<Yard?> CreateNewOneYardAsync(Yard yard);
    }
}
