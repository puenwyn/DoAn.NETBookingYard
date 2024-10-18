using BEBookingYard.Models;
using Microsoft.AspNetCore.Mvc;

namespace BEBookingYard.DTO
{
    public class YardDetailDTO 
    {
        public int Id { get; set; }
        public int YardId { get; set; }
        public string? Name { get; set; }
        public string? NameWithoutAccents { get; set; } // Thêm thuộc tính tên không dấu    
        public string? Location { get; set; }        
        public string? Description { get; set; }     
        public int Capacity { get; set; }
        public double Price { get; set; } 
        public double PricePeak { get; set; }  
        public short IsDelete { get; set; }
        public List<string> YardImages { get; set; }
        public List<string> Amenities { get; set; }
        public List<RatingDTO> Ratings { get; set; } // Danh sách đánh giá
    }
}
