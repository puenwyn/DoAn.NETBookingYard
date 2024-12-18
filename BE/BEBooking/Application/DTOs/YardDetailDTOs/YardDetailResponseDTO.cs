using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.YardDetailDTOs
{
    public class YardDetailResponseDTO
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public float Price { get; set; }
        public float PricePeak { get; set; }
    }
}
