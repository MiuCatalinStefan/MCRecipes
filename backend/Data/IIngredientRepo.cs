using System.Collections.Generic;
using MC_Api.Models;

namespace MC_Api.Data
{
    public interface IIngredientRepo
    {
        IEnumerable<Ingredient> GetAllIngredients();

        IEnumerable<Ingredient> GetIngredientsByID(int id);

        Ingredient GetIngredientByName(string name);
    }


}