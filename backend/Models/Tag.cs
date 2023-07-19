using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MC_Api.Models
{
    public class Tag{

        [Key]
        public int TagID { get; set; }

        [JsonIgnore]
        public IList<Recipe> Recipes { get; set; } = new List<Recipe>();

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
    
}