using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BEBookingYard.Models
{
    [Table("RATINGS")]
    public class RatingDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int UserId { get; set; } // Thêm ID của người dùng nếu cần thiết
        public int Yard { get; set; } // Tham chiếu đến YARD

        [StringLength(1024)]
        public string Comment { get; set; }

        public DateTime CreateAt { get; set; }

        [ForeignKey("Yard")]
        public virtual YardDetail YardDetail { get; set; } // Tham chiếu đến YARD_DETAIL
    }
}
