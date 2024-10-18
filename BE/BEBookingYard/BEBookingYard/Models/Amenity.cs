using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BEBookingYard.Models
{
    [Table("AMENITIES")]
    public class Amenity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Amenity name is required")]
        [StringLength(50, ErrorMessage = "Amenity name can't be longer than 50 characters")]
        public string Name { get; set; }

        public string Icon { get; set; } // Đường dẫn đến icon tiện ích
        public short IsDelete { get; set; } // Trạng thái tiện ích
    }
}
