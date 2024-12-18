using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.YardImageDTOs
{
    public class YardImageDTO
    {
        public int Id { get; set; }
        public int? YardId { get; set; }
        public byte[]? ImageURL { get; set; }
    }
}
