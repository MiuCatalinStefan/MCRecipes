using AutoMapper;
using MC_Api.Dtos.Tags;
using MC_Api.Models;

namespace MC_Api.Profiles
{
    public class TagsProfile : Profile
    {
        public TagsProfile()
        {
            CreateMap<Tag, TagReadDto>();

            CreateMap<TagCreateDto, Tag>();

            CreateMap<TagUpdateDto, Tag>();
        }
    }
}