using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.BookingDTOs
{
    public class BookingYardDetailDTO
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public string? Status { get; set; }
    }
}
