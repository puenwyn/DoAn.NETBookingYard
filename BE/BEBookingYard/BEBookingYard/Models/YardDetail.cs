using BEBookingYard.DTO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BEBookingYard.Models
{
    [Table("YARD_DETAIL")]
    public class YardDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Yard ID is required")]
        public int YardId { get; set; }  

        [Required(ErrorMessage = "Yard name is required")]
        [StringLength(255, ErrorMessage = "Yard name can't be longer than 255 characters")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Yard name without accents is required")]
        [StringLength(255, ErrorMessage = "Yard name without accents can't be longer than 255 characters")]
        public string? NameWithoutAccents { get; set; }  

        [Required(ErrorMessage = "Location is required")]
        [StringLength(50, ErrorMessage = "Location can't be longer than 50 characters")]
        public string? Location { get; set; }

        [StringLength(1024, ErrorMessage = "Description can't be longer than 1024 characters")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Capacity is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Capacity must be greater than 0")]
        public int Capacity { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive number")]
        public float Price { get; set; }

        [Required(ErrorMessage = "Price during peak hours is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Price during peak hours must be a positive number")]
        public float PricePeak { get; set; }

        [Required(ErrorMessage = "IsDelete is required")]
        [Range(0, 1, ErrorMessage = "IsDelete must be 0 or 1")]
        public short IsDelete { get; set; }
        public virtual ICollection<YardImage> YardImages { get; set; }
        public virtual ICollection<Amenity> Amenities { get; set; }
       
        public List<RatingDTO> Ratings { get; set; } // Danh sách đánh giá

    }
}
