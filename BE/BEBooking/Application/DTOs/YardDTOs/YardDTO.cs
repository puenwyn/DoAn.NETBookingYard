using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.DTOs.YardDTOs
{
    public class YardDTO
    {
        public int Id { get; set; }
        public string Name {  get; set; }
        public string NameTransfermed { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public short IsDelete { get; set; } = 0;
        [JsonIgnore]
        
        public YardType YardType { get; set; }
        [JsonIgnore]
        public ICollection<YardImage> YardImages {  get; set; }
    }
}
