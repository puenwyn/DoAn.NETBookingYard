using Application.DTOs.YardImageDTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IYardImageService
    {
        Task<YardImageDTO> DeleteOneYardImageAsync(int id);
        Task<YardImage> CreateOneYardImageAsync(YardImage yardImage);
    }
}
