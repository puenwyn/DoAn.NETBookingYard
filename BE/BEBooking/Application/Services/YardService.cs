using Application.DTOs;
using Application.DTOs.AmenityDTOs;
using Application.DTOs.YardDetailDTOs;
using Application.DTOs.YardDTOs;
using Application.Interfaces;
using Domain.Abstract;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Application.Services
{
    public class YardService : IYardService
    {
        private readonly IUnitOfWork _unitOfWork;
        public YardService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<YardRequestDTO> CreateNewOneYardAsync(YardRequestDTO requestDTO)
        {
            var yard = new Yard
            {
                Name = requestDTO.Name,
                NameTransformed = requestDTO.NameTransfermed,
                Address = requestDTO.Address,
                Description = requestDTO.Description,
                YardType = await _unitOfWork.YardTypeRepository.GetYardTypeByIdAsync(requestDTO.Type)
                ?? throw new KeyNotFoundException("Yard type is not found."),
                Owner = await _unitOfWork.OwnerRepository.GetOwnerByIdAsync(requestDTO.Owner)
                ?? throw new KeyNotFoundException("Owner is not found.")
            };
            var createdYard = await _unitOfWork.YardRepository.CreateNewOneYardAsync(yard);
            if (createdYard != null)
            {
                foreach (var yardDetailDTO in requestDTO.YardDetails)
                {
                    var yardDetail = new YardDetail
                    {
                        Name = yardDetailDTO.Name,
                        Location = yardDetailDTO.Location,
                        Description = yardDetailDTO.Description,
                        Capacity = yardDetailDTO.Capacity,
                        Price = yardDetailDTO.Price,
                        PricePeak = yardDetailDTO.PricePeak,
                        YardId = createdYard.Id
                    };
                    await _unitOfWork.YardDetailRepository.CreateNewOneYardDetail(yardDetail);
                }
                foreach (var amenityId in requestDTO.Amenities)
                {
                    var amenity = await _unitOfWork.AmenityRepository.GetAmenityByIdAsync(amenityId)
                        ?? throw new KeyNotFoundException("Amenity not found.");

                    var amenityOfYard = new AmenitiesOfYard
                    {
                        YardId = createdYard.Id,
                        AmenityId = amenity.Id
                    };
                    await _unitOfWork.AmenitiesOfYardRepository.CreateNewOneAmenitiesOfYardAsync(amenityOfYard);
                }
                foreach (var image in requestDTO.Images)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await image.CopyToAsync(memoryStream);

                        var yardImage = new YardImage
                        {
                            YardId = createdYard.Id,
                            ImageURL = memoryStream.ToArray()
                        };

                        await _unitOfWork.YardImageRepository.CreateNewOneYardImageAsync(yardImage);
                    }
                }
            }
            return requestDTO;
        }

        public async Task<ResponseYardAdminDTO?> GetYardDetailAdminById(int id)
        {
            var yard = await _unitOfWork.YardRepository.GetYardByIdAsync(id);
            if (yard == null) return null;
            var amenities = await _unitOfWork.AmenityRepository.GetAllAmenitiesAsync();

            var amenitiesDTO = yard.AmenitiesOfYard
                .Where(aoy => aoy.AmenityId != null)
                .Select(aoy => new Amenity
                {
                    Id = aoy.AmenityId,
                    Name = amenities.FirstOrDefault(a => a.Id == aoy.AmenityId)?.Name,
                    Icon = amenities.FirstOrDefault(a => a.Id == aoy.AmenityId)?.Icon,
                    IsDelete = amenities.FirstOrDefault(a => a.Id == aoy.AmenityId).IsDelete
                })
                .ToList();

            return new ResponseYardAdminDTO
            {
                Id = yard.Id,
                Name = yard.Name,
                NameTransfermed = yard.NameTransformed,
                Images = yard.YardImages,
                Description = yard.Description,
                YardType = yard.YardType,
                Owner = yard.Owner,
                Address = yard.Address,
                Amenities = amenities,
                YardDetails = yard.YardDetails
            };
        }

        public async Task<YardDetailClientDTO> GetYardDetailClientById(int id)
        {
            var yard = await _unitOfWork.YardRepository.GetYardByIdAsync(id);
            if (yard == null) return null;
            var amenities = await _unitOfWork.AmenityRepository.GetAllAmenitiesAsync();

            var amenitiesDTO = yard.AmenitiesOfYard
                .Where(aoy => aoy.AmenityId != null)
                .Select(aoy => new AmenityDTO
                {
                    Id = aoy.AmenityId,
                    Name = amenities.FirstOrDefault(a => a.Id == aoy.AmenityId)?.Name,
                    Icon = amenities.FirstOrDefault(a => a.Id == aoy.AmenityId)?.Icon,
                    IsDelete = amenities.FirstOrDefault(a => a.Id == aoy.AmenityId).IsDelete
                })
                .ToList();
            return new YardDetailClientDTO
            {
                Id = yard.Id,
                Images = yard.YardImages,
                Name = yard.Name,
                Address = yard.Address,
                NumberOfYard = yard.YardDetails.Count(x => x.IsDelete == 0),
                Rating = 5.0,
                Description = yard.Description,
                YardDetailDTOs = yard.YardDetails
                .Where(yd => yd.IsDelete == 0)
                .Select(yd => new YardDetailDTO
                {
                    Id = yd.Id,
                    Name = yd.Name,
                    Location = yd.Location,
                    Description = yd.Description,
                    Capacity = yd.Capacity,
                    Price = yd.Price,
                    PricePeak = yd.PricePeak,
                    IsDelete = yd.IsDelete
                }).ToList(),
                Amenities = amenitiesDTO
            };
        }

        public async Task<ResponseDatatable<YardAdminTableDTO>> GetYardsAdminTableAsync(int pageIndex, int pageSize = 10)
        {
            var (yards, totalRecords) = await _unitOfWork.YardRepository.GetYardsAdminTableAsync(pageIndex, pageSize);
            var query = yards
                .Select(yard => new YardAdminTableDTO
                {
                    Id = yard.Id,
                    Name = yard.Name,
                    Address = yard.Address,
                    Image = yard.YardImages.First(x => true).ImageURL,
                    Owner = yard.Owner.FullName,
                    YardType = yard.YardType.Name,
                    Description = yard.Description,
                    YardDetails = yard.YardDetails.Select(yd => new YardDetailDTO
                    {
                        Id = yd.Id,
                        Name = yd.Name,
                        Location = yd.Location,
                        Description = yd.Description,
                        Capacity = yd.Capacity,
                        Price = yd.Price,
                        PricePeak = yd.PricePeak,
                        IsDelete = yd.IsDelete
                    }).ToList()
                }); ;
            var yardsAdminTable = query.ToList();
            return new ResponseDatatable<YardAdminTableDTO>(totalRecords, yardsAdminTable, pageSize);
        }

        public async Task<ResponseDatatable<YardAdminTableDTO>> GetYardsAdminTableBySearchAsync(string key, int pageIndex, int pageSize = 10)
        {
            var (yards, totalRecords) = await _unitOfWork.YardRepository.GetYardsAdminTableBySearchAsync(key, pageIndex, pageSize);
            var query = yards
                .Select(yard => new YardAdminTableDTO
                {
                    Id = yard.Id,
                    Name = yard.Name,
                    Address = yard.Address,
                    YardType = yard.YardType.Name,
                    Owner = yard.Owner.FullName,
                    Image = yard.YardImages.First(x => true).ImageURL,
                    Description = yard.Description,
                    YardDetails = yard.YardDetails.Select(yd => new YardDetailDTO
                    {
                        Id = yd.Id,
                        Name = yd.Name,
                        Location = yd.Location,
                        Description = yd.Description,
                        Capacity = yd.Capacity,
                        Price = yd.Price,
                        PricePeak = yd.PricePeak,
                        IsDelete = yd.IsDelete
                    }).ToList()
                });
            var yardsAdminTable = query.ToList();
            return new ResponseDatatable<YardAdminTableDTO>(totalRecords, yardsAdminTable, pageSize);
        }

        public async Task<ResponseDatatable<YardClientDTO>> GetYardsClientAsync(int pageIndex, int pageSize = 10)
        {
            var (yards, totalRecords) = await _unitOfWork.YardRepository.GetYardsClientAsync(pageIndex, pageSize);
            var query = yards
                .Select(yard => new YardClientDTO
                {
                    Id = yard.Id,
                    Name = yard.Name,
                    Address = yard.Address,
                    NumberOfYard = yard.YardDetails.Count,
                    Images = yard.YardImages,
                    Times = new List<string> { "15:00", "16:00", "17:00" },
                    Rating = 5.0
                });
            var yardsClient = query.ToList();
            return new ResponseDatatable<YardClientDTO>(totalRecords, yardsClient, pageSize);
        }
    }
}
