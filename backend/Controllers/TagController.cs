using System.Collections.Generic;
using AutoMapper;
using MC_Api.Data;
using MC_Api.Dtos.Tags;
using MC_Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace MC_Api.Controllers
{
    [Route("api/tags")]
    [ApiController]

    public class TagController : ControllerBase
    {
        private readonly ITagRepo _repository;
        private readonly IMapper _mapper;

        public TagController(ITagRepo repository, IMapper mapper)
        {
            _repository = repository;

            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult <IEnumerable<TagReadDto>> GetAllTags()
        {
            var TagItems = _repository.GetAllTags();
            return Ok(_mapper.Map<IEnumerable<TagReadDto>>(TagItems));
        }


        [HttpGet("{id}", Name = "getTagByID")]
        public ActionResult <TagReadDto> GetTagByID(int id)
        {
            var TagItem = _repository.GetTagByID(id);
            if(TagItem == null)
                return NotFound();
            return Ok(_mapper.Map<TagReadDto>(TagItem));
        }

        [HttpPost]
        public ActionResult <TagReadDto> CreateTag(TagCreateDto tagCreateDto)
        {
            var tagModel = _mapper.Map<Tag>(tagCreateDto);

            if(tagModel == null)
            {
                return BadRequest("Null Tag");
            }

            _repository.CreateTag(tagModel);
            _repository.SaveChanges();

            var tagReadDto = _mapper.Map<TagReadDto>(tagModel);
            return CreatedAtRoute(nameof(GetTagByID), new {Name = tagReadDto.TagID}, tagReadDto);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteSpice(int id)
        {
            var tagModelFromRepo = _repository.GetTagByID(id);

            if(tagModelFromRepo == null)
            {
                return NotFound();
            }
            _repository.DeleteTag(tagModelFromRepo);
            _repository.SaveChanges();

            return NoContent();
        }




        [HttpPut("{id}")]
        public ActionResult UpdateTag(int id, TagUpdateDto tagUpdateDto)
        {
            var tagModelFromRepo = _repository.GetTagByID(id);

            if(tagModelFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(tagUpdateDto, tagModelFromRepo);

            _repository.UpdateTag(tagModelFromRepo);

            _repository.SaveChanges();

            return NoContent();
        }
    }
}