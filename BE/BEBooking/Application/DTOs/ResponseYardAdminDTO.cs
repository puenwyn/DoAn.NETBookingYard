using Application.DTOs.YardDetailDTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class ResponseYardAdminDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameTransfermed { get; set; }
        public IEnumerable<YardImage> Images { get; set; }
        public string Description { get; set; }
        public YardType YardType { get; set; }
        public Owner Owner { get; set; }
        public string Address { get; set; }
        public IEnumerable<Amenity> Amenities { get; set; }
        public IEnumerable<YardDetail> YardDetails { get; set; }
    }
}
