using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IYardTypeRepository
    {
        Task<IEnumerable<YardType>> GetYardTypesAsync();
        Task<IEnumerable<YardType>> GetYardTypesBySearchAsync(string keySearch);
        Task<YardType?> GetYardTypeByIdAsync(int id);
        Task<YardType?> CreateNewOneYardType(YardType yardType);
        Task<YardType?> UpdateOneYardType(YardType yardType);
    }
}
