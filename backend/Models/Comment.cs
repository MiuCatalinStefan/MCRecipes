using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MC_Api.Models
{
    public class Comment
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Recipe")]
        public int RecipeID { get; set; }


        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(500)]
        public string Text { get; set; }
    }
}