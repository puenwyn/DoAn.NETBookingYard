using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BEBookingYard.Models
{
    [Table("RATINGS")]
    public class Rating
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int UserId { get; set; }
        public int YardId { get; set; }

        [Required]
        public int RatingValue { get; set; }

        [StringLength(1024)]
        public string Comment { get; set; }

        public DateTime CreatedAt { get; set; }

        // Mối quan hệ
        [ForeignKey("YardId")]
        public YardDetail YardDetail { get; set; }
    }
}
