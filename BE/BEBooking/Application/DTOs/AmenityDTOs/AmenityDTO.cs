using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.AmenityDTOs
{
    public class AmenityDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Icon { get; set; }
        public short IsDelete { get; set; }
    }
}
