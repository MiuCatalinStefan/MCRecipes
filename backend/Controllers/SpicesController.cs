using System.Collections.Generic;
using AutoMapper;
using MC_Api.Data;
using MC_Api.Dtos.Spice;
using MC_Api.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;

namespace MC_Api.Controllers
{
    [Route("api/spices")]
    [ApiController]
    public class SpicesController : ControllerBase
    {
        private readonly ISpiceRepo _repository;
        private readonly IMapper _mapper;

        private readonly IWebHostEnvironment _env;

        public SpicesController(ISpiceRepo repository, IMapper mapper, IWebHostEnvironment env)
        {
            _repository = repository;

            _mapper = mapper;

            _env = env;
        }


        [HttpGet]
        public ActionResult <IEnumerable<SpiceReadDto>> GetAllSpices()
        {
            var SpiceItems = _repository.GetAllSpices();
            return Ok(_mapper.Map<IEnumerable<SpiceReadDto>>(SpiceItems));
        }

        [HttpGet("{name}", Name = "getSpiceByName")]
        public ActionResult <SpiceReadDto> GetSpiceByName(string name)
        {
            var SpiceItem = _repository.GetSpiceByName(name);
            if(SpiceItem == null)
                return NotFound();
            return Ok(_mapper.Map<SpiceReadDto>(SpiceItem));

        }


        [HttpPost]
        public ActionResult <SpiceReadDto> CreateSpice(SpiceCreateDto spiceCreateDto)
        {
            var spiceModel = _mapper.Map<Spice>(spiceCreateDto);

            if(spiceModel == null)
                return BadRequest("Null Spice");

            _repository.CreateSpice(spiceModel);
            _repository.SaveChanges();

            var spiceReadDto = _mapper.Map<SpiceReadDto>(spiceModel);

            return CreatedAtRoute(nameof(GetSpiceByName), new {Name = spiceReadDto.Name}, spiceReadDto);
            
        }


        [HttpPut("{id}")]
        public ActionResult UpdateSpice(int id, SpiceUpdateDto spiceUpdateDto)
        {
            var spiceModelFromRepo = _repository.GetSpiceByID(id);

            if(spiceModelFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(spiceUpdateDto, spiceModelFromRepo);

            _repository.UpdateSpice(spiceModelFromRepo);

            _repository.SaveChanges();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public ActionResult PartialSpiceUpdate(int id, JsonPatchDocument<SpiceUpdateDto> patchDoc)
        {
            var spiceModelFromRepo = _repository.GetSpiceByID(id);

            if(spiceModelFromRepo == null)
            {
                return NotFound();
            }

            var spiceToPatch = _mapper.Map<SpiceUpdateDto>(spiceModelFromRepo);
            patchDoc.ApplyTo(spiceToPatch, ModelState);
            if(!TryValidateModel(spiceToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(spiceToPatch, spiceModelFromRepo);

            _repository.UpdateSpice(spiceModelFromRepo);

            _repository.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteSpice(int id)
        {
             var spiceModelFromRepo = _repository.GetSpiceByID(id);

            if(spiceModelFromRepo == null)
            {
                return NotFound();
            }

            _repository.DeleteSpice(spiceModelFromRepo);
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
                return new JsonResult("AnonSpice.png");
            }
        }
    }
}