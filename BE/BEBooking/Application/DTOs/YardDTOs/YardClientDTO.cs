using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.YardDTOs
{
    public class YardClientDTO
    {
        public int Id { get; set; }
        public IEnumerable<YardImage> Images { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int NumberOfYard {  get; set; }
        public double Rating { get; set; }
        public IEnumerable<string> Times { get; set; }
    }
}
