using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MC_Api.Dtos.Spice
{
    public class SpiceUpdateDto
    {
        [Required]
        [MaxLength(25)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        [Column(TypeName ="varchar(50)")]
        public string Photo { get; set; }

        [Required]
        [MaxLength(250)]
        public string Description { get; set; }
    }
}