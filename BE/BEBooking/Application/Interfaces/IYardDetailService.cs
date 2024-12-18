using Application.DTOs.OwnerDTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IYardDetailService
    {
        Task<YardDetail> CreateOneNewYardDetail(YardDetail yardDetail);
        Task<YardDetail?> UpdateLockedAsync(int id);
        Task<YardDetail?> UpdateOneYardDetail(int id, YardDetail yardDetail);
    }
}
