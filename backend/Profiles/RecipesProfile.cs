using AutoMapper;
using MC_Api.Dtos.Recipes;
using MC_Api.Models;

namespace MC_Api.Profiles
{
    public class RecipeProfile : Profile
    {
        public RecipeProfile()
        {
            CreateMap<Recipe, RecipeReadDto>();

            CreateMap<RecipeCreateDto, Recipe>();

            CreateMap<RecipeUpdateDto, Recipe>();
        }
    }
}