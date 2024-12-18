using Application.DTOs.AmenityDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IAmenityService
    {
        Task<IEnumerable<AmenityDTO>> GetAllAmenitiesAsync();
    }
}
