using System;
using System.Collections.Generic;
using System.Linq;
using MC_Api.Models;
using Microsoft.EntityFrameworkCore;

namespace MC_Api.Data
{
    public class SqlRecipeRepo : IRecipeRepo
    {
        private readonly MC_ApiContext _context;

        public SqlRecipeRepo(MC_ApiContext context)
        {
                _context = context;
        }

        public void AddComment(int id, Comment cmt)
        {
            cmt.RecipeID=id;
            _context.Comments.Add(cmt);

            var recipe = _context.Recipes.FirstOrDefault(p => p.ID == id);

            if(recipe.Comments == null)
            {
               recipe.Comments = new List<Comment>();
            }
            
            recipe.Comments.Append(cmt);

            _context.SaveChanges();
        }

        public void AddIngredient(int id, Ingredient ing)
        {
             ing.RecipeID=id;
            _context.Ingredients.Add(ing);

            var recipe = _context.Recipes.FirstOrDefault(p => p.ID == id);

            if(recipe.Ingredients == null)
            {
               recipe.Ingredients = new List<Ingredient>();
            }
            
            recipe.Ingredients.Append(ing);

            _context.SaveChanges();
        }

        public void AddStep(int id, Step stp)
        {
             stp.RecipeID=id;
            _context.Steps.Add(stp);

            var recipe = _context.Recipes.FirstOrDefault(p => p.ID == id);

            if(recipe.Steps == null)
            {
               recipe.Steps = new List<Step>();
            }
            
            recipe.Steps.Append(stp);

            _context.SaveChanges();
        }

        public void AddTag(int idR, int idT)
        {

            var recipe = _context.Recipes.FirstOrDefault(p => p.ID == idR);
            var tag = _context.Tags.FirstOrDefault(p=>p.TagID == idT);

            if(recipe.Tags == null)
            {
               recipe.Tags = new List<Tag>();
            }
            
            recipe.Tags.Add(tag);

            _context.SaveChanges();
        }

        public void CreateRecipe(Recipe rsp)
        {
             if(rsp == null)
            {
                throw new ArgumentNullException(nameof(rsp));
            }

            _context.Recipes.Add(rsp);
        }

        public void DeleteComment(Comment cmt)
        {
            if(cmt == null)
            {
                throw new ArgumentNullException(nameof(cmt));
            }

            _context.Comments.Remove(cmt);
        }

        public void DeleteIngredient(Ingredient ing)
        {
           if(ing == null)
            {
                throw new ArgumentNullException(nameof(ing));
            }

            _context.Ingredients.Remove(ing);
        }

        public void DeleteLists(Recipe rsp)
        {
            _context.Ingredients.Where(x=> x.RecipeID == rsp.ID).ToList().ForEach(x=> _context.Ingredients.Remove(x));

            _context.Comments.Where(x=> x.RecipeID == rsp.ID).ToList().ForEach(x=> _context.Comments.Remove(x));

            _context.Steps.Where(x=> x.RecipeID == rsp.ID).ToList().ForEach(x=> _context.Steps.Remove(x));

            //_context.Tags.Where(x=>x.Recipes == rsp).ToList().ForEach(x=> x.Recipes.Remove(rsp));
        
            _context.SaveChanges();
        }

        public void DeleteRecipe(Recipe rsp)
        {
            if(rsp == null)
            {
                throw new ArgumentNullException(nameof(rsp));
            }

            _context.Recipes.Remove(rsp);
        }

        public void DeleteStep(Step stp)
        {
            if(stp == null)
            {
                throw new ArgumentNullException(nameof(stp));
            }

            _context.Steps.Remove(stp);
        }

        public void DeleteTag(int idR, int idT)
        {
            
            var recipe = _context.Recipes.FirstOrDefault(p => p.ID == idR);
            var tag = recipe.Tags.FirstOrDefault(p=>p.TagID == idT);
            _context.Entry(recipe).Collection("Tags").Load();
            List<int> tagIds = new List<int>();
            foreach(Tag tg in recipe.Tags)
                tagIds.Add(tg.TagID);

            recipe.Tags.Clear();
            _context.SaveChanges();
            
            recipe = _context.Recipes.FirstOrDefault(p => p.ID == idR);
            foreach(int id in tagIds)
            {
                if(id != idT){
                 AddTag(idR, id);
                }
            }

           // _context.Entry(recipe).Collection("Tags").Load();
           
           // recipe.Tags.Remove(tag);

            _context.SaveChanges();
            
            /*
            var recipe = _context.Recipes.FirstOrDefault(p => p.ID == idR);
            var tag = recipe.Tags.FirstOrDefault(p=>p.TagID == idT);

            if(recipe != null)
            {
                foreach(var tags in recipe.Tags.Where(at => ))
            }
            */
        }

        public IEnumerable<Recipe> GetAllRecipes()
        {
            
            return _context.Recipes
                        .Include(a => a.Ingredients)
                        .Include(e => e.Steps)
                        .Include(i => i.Comments)
                        .Include(o => o.Tags)
                        .ToList();
        }

        public Comment getCommentByID(int id)
        {
            return _context.Comments.FirstOrDefault(p => p.ID == id);
        }

        public Ingredient getIngredientByID(int id)
        {
            return _context.Ingredients.FirstOrDefault(p => p.ID == id);
        }

        public Recipe GetRecipeByID(int id)
        {
            return _context.Recipes.FirstOrDefault(p => p.ID == id);
        }


        public Recipe GetRecipeByName(string name)
        {
            return _context.Recipes.FirstOrDefault(p => p.Title == name);
        }

        public Step getStepByID(int id)
        {
             return _context.Steps.FirstOrDefault(p => p.ID == id);
        }

        public Tag getTagByID(int id)
        {
            return _context.Tags.FirstOrDefault(p => p.TagID == id);
        }

        public Tag getTagByName(string name)
        {
            return _context.Tags.FirstOrDefault(p => p.Name == name);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void UpdateRecipe(Recipe rsp)
        {
            //Nothing
        }


    }
}