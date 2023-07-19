using System.Collections.Generic;
using MC_Api.Models;

namespace MC_Api.Data
{
    public interface IRecipeRepo
    {
        IEnumerable<Recipe> GetAllRecipes();

        Recipe GetRecipeByName(string name);

        Recipe GetRecipeByID(int id);

        void CreateRecipe(Recipe rsp);

        bool SaveChanges();

        void DeleteRecipe(Recipe rsp);

        void UpdateRecipe(Recipe rsp);

        void DeleteLists(Recipe rsp);

        void AddComment(int id, Comment cmt);

        void AddIngredient(int id, Ingredient ing);

        void AddStep(int id, Step stp);

        void AddTag(int idR, int idT);

        void DeleteComment(Comment cmt);

        void DeleteStep(Step stp);

        void DeleteIngredient(Ingredient ing);

        void DeleteTag(int idR, int idT);

        Comment getCommentByID(int id);

        Ingredient getIngredientByID(int id);

        Step getStepByID(int id);

        Tag getTagByID(int id);
        Tag getTagByName(string name);

        
    }
}