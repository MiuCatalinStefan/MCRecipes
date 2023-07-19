using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MC_Api.Models
{
    public class Spice
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(25)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        [Column(TypeName ="varchar(50)")]
        public string Photo { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }
    }
}