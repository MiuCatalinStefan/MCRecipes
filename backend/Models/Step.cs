using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MC_Api.Models
{
    public class Step 
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Recipe")]
        public int RecipeID { get; set; }

        [Required]
        [MaxLength(50)]
        [Column(TypeName ="varchar(50)")]
        public string Video { get; set; }

        public float Timer { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }
    }
}