using AutoMapper;
using MC_Api.Dtos;
using MC_Api.Models;

namespace MC_Api.Profiles
{
    public class UsersProfile : Profile
    {
        public UsersProfile()
        {
            CreateMap<User, UserReadDto>();
            CreateMap<UserCreateDto, User>();
            
        }
        

    }
}