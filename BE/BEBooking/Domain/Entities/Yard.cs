using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Yard : BaseEntity
    {
        public override int Id { get; set; }
        public int? YardTypeId { get; set; }
        public string? Name { get; set; }
        public string? NameTransformed { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public int OwnerId { get; set; }
        public short IsDelete { get; set; } = 0;
        [JsonIgnore]
        public YardType? YardType { get; set; }
        [JsonIgnore]
        public Owner? Owner { get; set; }
        [JsonIgnore]
        public ICollection<YardImage>? YardImages { get; set; }
        [JsonIgnore]
        public ICollection<YardDetail>? YardDetails { get; set; }
        [JsonIgnore]
        public ICollection<AmenitiesOfYard>? AmenitiesOfYard { get; set; }
        [JsonIgnore]
        public ICollection<Wishlist>? Wishlists { get; set; }
        [JsonIgnore]
        public ICollection<Rating>? Ratings { get; set; }
    }
}
