using Domain.Common;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User : IdentityUser
    {
        public string? FCMToken { get; set; }
        public string? FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public short? Gender { get; set; }
        public string? Address { get; set; }
        [JsonIgnore]
        public ICollection<Booking>? Bookings { get; set; }
        [JsonIgnore]
        public ICollection<Rating>? Ratings { get; set; }
        [JsonIgnore]
        public ICollection<Wishlist>? Wishlists { get; set; }

    }
}
