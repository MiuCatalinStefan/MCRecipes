using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MC_Api.Models
{
    public class Recipe
    {   
        [Key]
        public int ID { get; set; }

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

        /*
        [Required]
        [MaxLength(2000)]

        public string LongDescription { get; set; }
        */

        [JsonIgnore]
        public IList<Tag> Tags { get; set; }  = new List<Tag>();
    
        public IList<Ingredient> Ingredients { get; set; } = new List<Ingredient>();

        public IList<Step> Steps { get; set; } = new List<Step>();

        public IList<Comment> Comments { get; set; } = new List<Comment>();
    }
}