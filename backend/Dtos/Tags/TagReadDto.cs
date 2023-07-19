using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MC_Api.Models;

namespace MC_Api.Dtos.Tags
{
    public class TagReadDto
    {

        [Key]
        public int TagID { get; set; }

        public IList<Recipe> Recipes { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}