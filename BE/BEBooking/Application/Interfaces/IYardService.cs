using Application.DTOs.OwnerDTOs;
using Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.YardDTOs;

namespace Application.Interfaces
{
    public interface IYardService
    {
        Task<ResponseDatatable<YardAdminTableDTO>> GetYardsAdminTableAsync(int pageIndex, int pageSize = 10);
        Task<ResponseDatatable<YardAdminTableDTO>> GetYardsAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10);
        Task<ResponseDatatable<YardClientDTO>> GetYardsClientAsync(int pageIndex, int pageSize = 10);
        Task<YardDetailClientDTO> GetYardDetailClientById(int id);
        Task<ResponseYardAdminDTO?> GetYardDetailAdminById(int id);
        Task<YardRequestDTO> CreateNewOneYardAsync(YardRequestDTO requestDTO);
    }
}
