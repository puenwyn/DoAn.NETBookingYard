using BEBookingYard.Models;

namespace BEBookingYard.DTO
{
    public class YardDTO
    {
        public int Id { get; set; }
        public int YardType { get; set; }
        public string Name { get; set; }
        public string NameTransformed { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        //public int Owner { get; set; }
        //public short IsDelete { get; set; }
        public List<AmenitiesDTO> Amenities { get; set; } // Thêm danh sách tiện nghi
        public List<string> YardImages { get; set; }
        public List<RatingDTO> Ratings { get; set; }
       
        public List<YardDetailDTO> Details { get; set; } // Danh sách chi tiết sân
    }
}
