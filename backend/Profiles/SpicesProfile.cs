using AutoMapper;
using MC_Api.Dtos.Spice;
using MC_Api.Models;

namespace MC_Api.Profiles
{
    public class SpicesProfile : Profile
    {
        public SpicesProfile()
        {
            CreateMap<Spice, SpiceReadDto>();

            CreateMap<SpiceCreateDto, Spice>();

            CreateMap<SpiceUpdateDto, Spice>();

            CreateMap<Spice, SpiceUpdateDto>();

        }
    }
}