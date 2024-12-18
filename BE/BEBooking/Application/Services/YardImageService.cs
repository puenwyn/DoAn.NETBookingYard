using Application.DTOs.YardImageDTOs;
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
    public class YardImageService : IYardImageService
    {
        private readonly IUnitOfWork _unitOfWork;
        public YardImageService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<YardImage> CreateOneYardImageAsync(YardImage yardImage)
        {
            await _unitOfWork.YardImageRepository.CreateNewOneYardImageAsync(yardImage);
            return yardImage;
        }

        public async Task<YardImageDTO> DeleteOneYardImageAsync(int id)
        {
            var yardImage = await _unitOfWork.YardImageRepository.GetYardImageByIdAsync(id);
            if (yardImage == null)
            {
                return new YardImageDTO();
            }
            else
            {
                var deletedYardImage = await _unitOfWork.YardImageRepository.DeleteOneYardImageAsync(yardImage);
                return deletedYardImage == null ? new YardImageDTO() : new YardImageDTO
                {
                    Id = deletedYardImage.Id,
                    ImageURL = deletedYardImage.ImageURL,
                    YardId = deletedYardImage.YardId
                };
            }
        }
    }
}
