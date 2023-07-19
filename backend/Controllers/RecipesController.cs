using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using AutoMapper;
using MC_Api.Data;
using MC_Api.Dtos.Recipes;
using MC_Api.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace MC_Api.Controllers
{
    [Route("api/recipes")]
    [ApiController] 
    public class RecipesController : ControllerBase
    {
        private readonly IRecipeRepo _repository;
        private readonly IMapper _mapper;

        private readonly IWebHostEnvironment _env;

        public RecipesController(IRecipeRepo repository, IMapper mapper, IWebHostEnvironment env)
        {
            _repository = repository;

            _mapper = mapper;

             _env = env;

        }

        [HttpGet]
        public ActionResult <IEnumerable<RecipeReadDto>> GetAllRecipes()
        {
            var RecipeItems =  _repository.GetAllRecipes();
            return Ok(_mapper.Map<IEnumerable<RecipeReadDto>>(RecipeItems));
        }

        [HttpGet("{name}", Name = "getRecipeByName")]
        public ActionResult <Recipe> GetRecipeByName(string name)
        {
            var RecipeItem = _repository.GetRecipeByName(name);
            if(RecipeItem == null)
                return NotFound();
            return Ok(_mapper.Map<RecipeReadDto>(RecipeItem));
        }

        [HttpPost]
        
        public ActionResult <RecipeCreateDto> CreateRecipe(RecipeCreateDto recipeCreateDto)
        {
             var recipeModel = _mapper.Map<Recipe>(recipeCreateDto);

            if(recipeModel == null)
                return BadRequest("Null Recipe");

            _repository.CreateRecipe(recipeModel);
            _repository.SaveChanges();

            var recipeReadDto = _mapper.Map<RecipeReadDto>(recipeModel);

            return CreatedAtRoute(nameof(GetRecipeByName), new {Name = recipeReadDto.Title}, recipeReadDto);
        }

        [HttpDelete("{id}")]

        public ActionResult DeleteRecipe(int id)
        {
            var recipeModelFromRepo = _repository.GetRecipeByID(id);

            if(recipeModelFromRepo == null)
            {
                return NotFound();
            }

            _repository.DeleteRecipe(recipeModelFromRepo);
            _repository.SaveChanges();

            return NoContent();
        }

        [HttpPut("{id}")]

        public ActionResult UpdateRecipe(int id, RecipeCreateDto recipeUpdateDto)
        {
            var recipeModelFromRepo = _repository.GetRecipeByID(id);

            if(recipeModelFromRepo == null)
            {
                return NotFound();
            }

           // _repository.DeleteLists(recipeModelFromRepo);

          //  _mapper.Map(recipeUpdateDto, recipeModelFromRepo);
          recipeModelFromRepo.Description=recipeUpdateDto.Description;
          recipeModelFromRepo.Photo=recipeUpdateDto.Photo;
          recipeModelFromRepo.Title=recipeUpdateDto.Title;
            
          //  RecipeUpdateDto.Tags.ForeachrecipeModelFromRepo.Add();
            _repository.UpdateRecipe(recipeModelFromRepo);

            _repository.SaveChanges();

            return NoContent();
        }


        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {

                var httpRequest = Request.Form;

                var postedFile = httpRequest.Files[0];

                string filename = postedFile.FileName;

                var physicalPath= _env.ContentRootPath + "/Photos/" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }


                return new JsonResult(filename);
            }
            catch(Exception)
            {
                return new JsonResult("AnonRecipe.png");
            }
        }

        [HttpPost]
        [Route("AddComment/{id}")]
        public ActionResult AddComment(int id, Comment comm)
        {
            var recipeModelFromRepo = _repository.GetRecipeByID(id);

            if(recipeModelFromRepo == null)
            {
                return NotFound();
            } 
            
            _repository.AddComment(id, comm);

            _repository.SaveChanges();

            return NoContent();

        }

        [HttpPost]
        [Route("AddIgredient/{id}")]
        public ActionResult AddIngredient(int id, Ingredient ing)
        {
            var recipeModelFromRepo = _repository.GetRecipeByID(id);

            if(recipeModelFromRepo == null)
            {
                return NotFound();
            } 
            
            _repository.AddIngredient(id, ing);

            _repository.SaveChanges();

            return NoContent();

        }

        [HttpPost]
        [Route("AddStep/{id}")]
        public ActionResult AddStep(int id, Step stp)
        {
            var recipeModelFromRepo = _repository.GetRecipeByID(id);

            if(recipeModelFromRepo == null)
            {
                return NotFound();
            } 
            
            _repository.AddStep(id, stp);

            _repository.SaveChanges();

            return NoContent();

        }

        [HttpPost]
        [Route("AddTag/{idR}/{nume}")]
        public ActionResult AddTag(int idR, string nume)
        {

            var recipeModelFromRepo = _repository.GetRecipeByID(idR);
            var tag = _repository.getTagByName(nume);

            if(recipeModelFromRepo == null)
            {
                return NotFound("Nada Reteta");
            } 

            if(tag == null)
            {
                return NotFound("Nada tag");
            } 
            
            _repository.AddTag(idR, tag.TagID);

            _repository.SaveChanges();

            return NoContent();

        }

        [HttpDelete]
        [Route("DeleteComment/{id}")]
        public ActionResult DeleteComment(int id)
        {
            var comment = _repository.getCommentByID(id);

            if(comment == null)
                return NotFound();

            _repository.DeleteComment(comment);
            _repository.SaveChanges();
            return NoContent();
        }

        [HttpDelete]
        [Route("DeleteIngredient/{id}")]
        public ActionResult DeleteIngredient(int id)
        {
            var ingredient = _repository.getIngredientByID(id);

            if(ingredient == null)
                return NotFound();

            _repository.DeleteIngredient(ingredient);
            _repository.SaveChanges();
            return NoContent();
        }

        [HttpDelete]
        [Route("DeleteStep/{id}")]
        public ActionResult DeleteStep(int id)
        {
            var step = _repository.getStepByID(id);

            if(step == null)
                return NotFound();

            _repository.DeleteStep(step);
            _repository.SaveChanges();
            return NoContent();
        }

        [HttpDelete]
        [Route("DeleteTag/{idR}/{name}")]
        public ActionResult DeleteTag(int idR , string name)
        {
            var tag = _repository.getTagByName(name);
            var recipeModelFromRepo = _repository.GetRecipeByID(idR);
            if(tag == null)
                return NotFound();
            if(recipeModelFromRepo == null)
                return NotFound();
            _repository.DeleteTag(idR, tag.TagID);
            return NoContent();
        }

        [HttpPut]
        [Route("UpdateIngredient/{id}")]
        public ActionResult UpdateIngredient(int id, Ingredient newing){
            
            var ing = _repository.getIngredientByID(id);

            if(ing == null)
                return NotFound();

            ing.Name = newing.Name;

            _repository.SaveChanges();

            return NoContent();
        }

        [HttpPut]
        [Route("UpdateStep/{id}")]
        public ActionResult UpdateStep(int id, Step newstep){
            
            var step = _repository.getStepByID(id);

            if(step == null)
                return NotFound();
            

            step.Description = newstep.Description;
            step.Video = newstep.Video;
            step.Timer= newstep.Timer;

            _repository.SaveChanges();

            return NoContent();
        }
        
    }
}