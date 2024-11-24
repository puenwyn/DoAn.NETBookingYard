using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BEBookingYard.Models
{
    [Table("YARD_IMAGE")]
    public class YardImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int YardId { get; set; }

        [Required]
        public string ImageURL { get; set; }

        // Mối quan hệ
        [ForeignKey("YardId")]
        public Yard YardD { get; set; }
    }
}
