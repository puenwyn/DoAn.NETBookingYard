using BEBookingYard.Models;

namespace BEBookingYard.DTO
{
    public class YardDetailDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public int YardId { get; set; } // ID của sân
        public int Capacity { get; set; } // Thay đổi từ float sang double
        public float Price { get; set; } // Thay đổi từ float sang double
        public float PricePeak { get; set; } // Thay đổi từ float sang double
        public short IsDelete { get; set; }

    }
}
