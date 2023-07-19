using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MC_Api.Models
{
    public class Ingredient
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Recipe")]
        public int RecipeID { get; set; }

        [Required]
        [MaxLength(25)]
        public string Name { get; set; }
    }
}