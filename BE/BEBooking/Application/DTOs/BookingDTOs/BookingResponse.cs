using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.BookingDTOs
{
    public class BookingResponse
    {
        public string Date { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string Status { get; set; }
    }
}
