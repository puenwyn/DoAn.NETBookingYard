using Application.DTOs.UserDTOs;
using Application.DTOs.YardDetailDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.DTOs.BookingDTOs
{
    public class BookingDataDTO
    {
        public UserDTO User { get; set; }
        [JsonPropertyName("yard")]
        public YardDetailDTO Yard { get; set; }
        public ICollection<TimeDTO> Times { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Detail { get; set; }
    }
}
