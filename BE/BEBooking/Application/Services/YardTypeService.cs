using Application.DTOs.YardTypeDTOs;
using Application.Interfaces;
using Application.Utils;
using Domain.Abstract;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class YardTypeService : IYardTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        public YardTypeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<YardTypeDTO> CreateNewOneYardTypeAsync(YardType yardType)
        {
            yardType.Name = StringHanlder.CapitalizeFirstLetterOfEachWord(yardType.Name);
            var yardTypeCreated = await _unitOfWork.YardTypeRepository.CreateNewOneYardType(yardType);
            return yardTypeCreated == null ? new YardTypeDTO() : new YardTypeDTO
            {
                Id = yardTypeCreated.Id,
                Name = yardTypeCreated?.Name,
                IsDelete = yardTypeCreated?.IsDelete
            };
        }

        public async Task<YardTypeDTO?> DeleteOneYardTypeByIdAsync(int id)
        {
            var yardType = await _unitOfWork.YardTypeRepository.GetYardTypeByIdAsync(id);
            if (yardType == null)
            {
                return null;
            }
            else
            {
                yardType.IsDelete = 1;
                var yardTypeDeleted = await _unitOfWork.YardTypeRepository.UpdateOneYardType(yardType);
                return yardTypeDeleted == null ? null : new YardTypeDTO
                {
                    Id = yardTypeDeleted.Id,
                    Name = yardTypeDeleted?.Name,
                    IsDelete = yardTypeDeleted?.IsDelete
                };
            }
        }

        public async Task<YardTypeDTO?> GetYardTypeByIdAsync(int id)
        {
            var yardType = await _unitOfWork.YardTypeRepository.GetYardTypeByIdAsync(id);
            if (yardType == null)
            {
                return null;
            }
            else
            {
                return new YardTypeDTO
                {
                    Id = yardType.Id,
                    Name = yardType?.Name,
                    IsDelete = yardType?.IsDelete
                };
            }
        }

        public async Task<IEnumerable<YardTypeDTO>> GetYardTypesAsync()
        {
            var yardTypes = await _unitOfWork.YardTypeRepository.GetYardTypesAsync();
            return yardTypes.Select(yardType => new YardTypeDTO
            {
                Id = yardType.Id,
                Name = yardType.Name,
                IsDelete = yardType.IsDelete
            }).ToList();
        }

        public async Task<IEnumerable<YardTypeDTO>> GetYardTypesBySearchAsync(string keySearch)
        {
            var yardTypes = await _unitOfWork.YardTypeRepository.GetYardTypesBySearchAsync(keySearch);
            return yardTypes.Select(yardType => new YardTypeDTO
            {
                Id = yardType.Id,
                Name = yardType.Name,
                IsDelete = yardType.IsDelete
            }).ToList();
        }

        public async Task<YardTypeDTO?> UpdateOneYardTypeAsync(int id,YardType yardType)
        {
            var yardTypeExist = await _unitOfWork.YardTypeRepository.GetYardTypeByIdAsync(id);
            if (yardTypeExist == null)
            {
                return null;
            }
            else
            {
                yardTypeExist.Name = StringHanlder.CapitalizeFirstLetterOfEachWord(yardType.Name);
                yardTypeExist.IsDelete = yardType.IsDelete;
                var yardTypeUpdated = await _unitOfWork.YardTypeRepository.UpdateOneYardType(yardTypeExist);
                return yardTypeUpdated == null ? null : new YardTypeDTO
                {
                    Id = yardTypeUpdated.Id,
                    Name = yardTypeUpdated?.Name,
                    IsDelete = yardTypeUpdated?.IsDelete
                };
            }
        }
    }
}
