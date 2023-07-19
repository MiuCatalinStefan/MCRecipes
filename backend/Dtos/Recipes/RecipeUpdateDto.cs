using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MC_Api.Models;

namespace MC_Api.Dtos.Recipes
{
    public class RecipeUpdateDto
    {
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }

        
        [Required]
        [MaxLength(50)]
        [Column(TypeName ="varchar(50)")]
        public string Photo { get; set; }

        [Required]
        [MaxLength(100)]
        public string Description{ get; set; }
        
       // public IList<Tag> Tags { get; set; } 
    
        [Required]
        public List<Ingredient> Ingredients { get; set; } 

        [Required]
        public List<Step> Steps { get; set; }

        public List<Comment> Comments { get; set; }
    }
}