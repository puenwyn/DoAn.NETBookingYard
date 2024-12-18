using Application.DTOs.YardDetailDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.YardDTOs
{
    public class YardAdminTableDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] Image { get; set; }
        public string Owner { get; set; }
        public string YardType { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public IEnumerable<YardDetailDTO> YardDetails { get; set; }

    }
}
