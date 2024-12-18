using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.DTOs.BookingDTOs
{
    public class BookingHistoryDTO
    {
        public IEnumerable<BookingDTO> Bookings { get; set; }
        public string GiamGia { get; set; }
        public string PaymentMethod { get; set; }
        public string Total { get; set; }
    }
}
