using Application.DTOs.AmenityDTOs;
using Application.Interfaces;
using Domain.Abstract;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class AmenityService : IAmenityService
    {
        private readonly IUnitOfWork _unitOfWork;
        public AmenityService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<AmenityDTO>> GetAllAmenitiesAsync()
        {
            var amenities = await _unitOfWork.AmenityRepository.GetAllAmenitiesAsync();
            return amenities
                .Select(amenity =>
                    new AmenityDTO
                    {
                        Id = amenity.Id,
                        Name = amenity.Name,
                        Icon = amenity.Icon,
                        IsDelete = amenity.IsDelete
                    }
                ).ToList();
        }
    }
}
