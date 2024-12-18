using Application.DTOs.OwnerDTOs;
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
    public class YardDetailService : IYardDetailService
    {
        private readonly IUnitOfWork _unitOfWork;
        public YardDetailService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<YardDetail> CreateOneNewYardDetail(YardDetail yardDetail)
        {
            await _unitOfWork.YardDetailRepository.CreateNewOneYardDetail(yardDetail);
            return yardDetail;
        }

        public async Task<YardDetail?> UpdateLockedAsync(int id)
        {
            var yardDetail = await _unitOfWork.YardDetailRepository.GetYardDetailByIdAsync(id);
            if (yardDetail == null)
            {
                return null;
            }
            if (yardDetail.IsDelete.HasValue)
            {
                yardDetail.IsDelete = yardDetail.IsDelete == 0 ? (short)1 : (short)0;
            }
            else
            {
                yardDetail.IsDelete = 0;
            }
            await _unitOfWork.SaveChangeAsync();
            return yardDetail;
        }

        public async Task<YardDetail?> UpdateOneYardDetail(int id, YardDetail yardDetail)
        {
            var yardDetailExist = await _unitOfWork.YardDetailRepository.GetYardDetailByIdAsync(id);
            if (yardDetailExist == null)
            {
                return null;
            }
            else
            {
                yardDetailExist.Name = yardDetail.Name;
                yardDetailExist.Capacity = yardDetail.Capacity;
                yardDetailExist.IsDelete = yardDetail.IsDelete;
                yardDetailExist.Description = yardDetail.Description;
                yardDetailExist.Location = yardDetail.Location;
                yardDetailExist.PricePeak = yardDetail.PricePeak;
                yardDetailExist.Price = yardDetail.Price;
                yardDetailExist.YardId = yardDetail.YardId;
                await _unitOfWork.YardDetailRepository.UpdateOneYardDetail(yardDetailExist);
                return yardDetailExist;
            }
        }
    }
}
