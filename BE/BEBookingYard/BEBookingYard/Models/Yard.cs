using System.ComponentModel.DataAnnotations;
using BEBookingYard.DTO;
using System.ComponentModel.DataAnnotations.Schema;

namespace BEBookingYard.Models
{
    [Table("YARDS")]
    public class Yard
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "YardType is required")]
        public int YardType { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(255, ErrorMessage = "Name can't be longer than 255 characters")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "NameTransformed is required")]
        [StringLength(255, ErrorMessage = "NameTransformed can't be longer than 255 characters")]
        public string? NameTransformed { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [StringLength(500, ErrorMessage = "Address can't be longer than 500 characters")]
        public string? Address { get; set; }

        [StringLength(1024, ErrorMessage = "Description can't be longer than 1024 characters")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Amenity is required")]
        public int Amenity { get; set; }
        [Required(ErrorMessage = "IsDelete is required")]
        [Range(0, 1, ErrorMessage = "IsDelete must be 0 or 1")]
        public short IsDelete { get; set; }

       
        public virtual ICollection<YardImage> YardImages { get; set; }
        public List<RatingDTO> Ratings { get; set; } // Danh sách đánh giá
        public List<YardDetail> Details { get; set; }
        public List<AmenitiesDTO> Amenities { get; set; } // Danh sách tiện nghi
 }
}
