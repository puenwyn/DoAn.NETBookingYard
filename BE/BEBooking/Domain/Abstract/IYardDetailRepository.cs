using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IYardDetailRepository
    {
        Task<YardDetail> CreateNewOneYardDetail(YardDetail yardDetail);
        Task<YardDetail> UpdateOneYardDetail(YardDetail yardDetail);
        Task<YardDetail> GetYardDetailByIdAsync(int id);
    }
}
