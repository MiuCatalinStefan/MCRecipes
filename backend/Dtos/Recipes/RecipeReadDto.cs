using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using MC_Api.Models;

namespace MC_Api.Dtos.Recipes
{
    public class RecipeReadDto
    {
        public int ID { get; set; }

        public string Title { get; set; }
          
        public string Photo { get; set; }

        public string Description{ get; set; }
        public IList<Ingredient> Ingredients { get; set; } 
        
        public IList<Step> Steps { get; set; } 

        public IList<Tag> Tags {get; set;} 

        public IList<Comment> Comments { get; set; } 
    }
}