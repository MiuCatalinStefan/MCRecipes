using System.ComponentModel.DataAnnotations;

namespace MC_Api.Dtos.Ingredients
{
    public class IngredientReadDto
    {
        [Required]
        [MaxLength(25)]
        public string Name { get; set; }
    }
}