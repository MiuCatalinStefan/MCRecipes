using System.Collections.Generic;
using System.Linq;
using MC_Api.Models;

namespace MC_Api.Data
{
    public class SqlIngredientRepo : IIngredientRepo
    {
        private readonly MC_ApiContext _context;

        public SqlIngredientRepo(MC_ApiContext context)
        {
            _context = context;
        }

        public IEnumerable<Ingredient> GetAllIngredients()
        {
            return _context.Ingredients.ToList();
        }

        public Ingredient GetIngredientByName(string name)
        {
            return _context.Ingredients.FirstOrDefault(p => p.Name == name);
        }

        public IEnumerable<Ingredient> GetIngredientsByID(int id)
        {
            return _context.Ingredients.Where(b => b.RecipeID == id);
        }
    }
}