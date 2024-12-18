using Application.DTOs.YardTypeDTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IYardTypeService
    {
        Task<IEnumerable<YardTypeDTO>> GetYardTypesAsync();
        Task<IEnumerable<YardTypeDTO>> GetYardTypesBySearchAsync(string keySearch);
        Task<YardTypeDTO?> GetYardTypeByIdAsync(int id);
        Task<YardTypeDTO> CreateNewOneYardTypeAsync(YardType yardType);
        Task<YardTypeDTO?> UpdateOneYardTypeAsync(int id, YardType yardType);
        Task<YardTypeDTO?> DeleteOneYardTypeByIdAsync(int id);
    }
}
