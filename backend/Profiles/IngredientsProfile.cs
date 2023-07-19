using AutoMapper;
using MC_Api.Dtos.Ingredients;
using MC_Api.Models;

namespace MC_Api.Profiles
{
    public class IngredientsProfile : Profile
    {
        public IngredientsProfile()
        {
            CreateMap<Recipe, IngredientReadDto>();
        }
    }
}