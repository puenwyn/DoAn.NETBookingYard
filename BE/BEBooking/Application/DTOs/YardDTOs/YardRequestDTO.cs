using Application.DTOs.YardDetailDTOs;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.YardDTOs
{
    public class YardRequestDTO
    {
        public string Name { get; set; }
        public string NameTransfermed { get; set; }
        public IEnumerable<IFormFile> Images { get; set; }
        public string Description { get; set; }
        public int Type { get; set; }
        public int Owner { get; set; }
        public string Address { get; set; }
        public IEnumerable<int> Amenities { get; set; }
        public IEnumerable<YardDetailResponseDTO> YardDetails { get; set; }
    }
}
