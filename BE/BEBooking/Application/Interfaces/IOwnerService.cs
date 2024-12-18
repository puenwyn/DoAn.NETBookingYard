using Application.DTOs;
using Application.DTOs.OwnerDTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IOwnerService
    {
        Task<ResponseDatatable<OwnerAdminTableDTO>> GetOwnersAdminTableAsync(int pageIndex, int pageSize = 10);
        Task<ResponseDatatable<OwnerAdminTableDTO>> GetOwnersAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10);
        Task<IEnumerable<OwnerSelectDTO>> GetOwnersSelectAsync();
        Task<OwnerAdminTableDTO?> UpdateLockedAsync(int id);
        Task<OwnerAdminTableDTO> CreateNewOneOwnerAsync(Owner owner);
        Task<OwnerAdminTableDTO?> UpdateOneOwnerAsync(int id, Owner owner);
        Task<Owner?> FindByOwnerIdAsync(int id);
    }
}
