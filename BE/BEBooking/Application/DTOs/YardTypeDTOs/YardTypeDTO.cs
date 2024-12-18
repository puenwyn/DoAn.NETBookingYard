using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.YardTypeDTOs
{
    public class YardTypeDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public short? IsDelete { get; set; } = 0;
    }
}
