using Application.DTOs.YardDTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.DTOs.BookingDTOs
{
    public class BookingDTO
    {
        public int Id {  get; set; }
        public YardDTO Yard { get; set; }       
        public YardDetail YardDetail {  get; set; }
        public DateTime? StartTime {  get; set; }
        public DateTime? EndTime { get; set; }
        public string Status { get; set; }
        public string Note { get; set; }
        public string QrCode { get; set; }
        public short IsDelete { get; set; } = 0;
    }
}
