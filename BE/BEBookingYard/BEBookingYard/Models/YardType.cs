using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BEBookingYard.Models
{
    [Table("YARD_TYPES")]
    public class YardType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(50, ErrorMessage = "Name can't be longer than 50 characters")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "IsDelete is required")]
        [Range(0, 1, ErrorMessage = "IsDelete must be 0 or 1")]
        public short IsDelete { get; set; }
    }
}
