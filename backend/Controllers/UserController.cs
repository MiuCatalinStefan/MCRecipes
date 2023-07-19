using MC_Api.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using AutoMapper;
using MC_Api.Dtos;
using MC_Api.Models;
using System.Collections.Generic;
using MC_Api.Helpers;
using Microsoft.AspNetCore.Http;

namespace MC_Api.Controllers
{
    [Route("api/users")]
    [ApiController]

    public class UsersController : Controller
    {
        private readonly IUserRepo _repository;
        private readonly IMapper _mapper;
        private readonly JwtService _jwtService;

        public UsersController(IUserRepo repository, IMapper mapper, JwtService jwtService)
        {
            _repository = repository;
            
            _mapper = mapper;

            _jwtService = jwtService;
        }

        [HttpGet]
        public ActionResult  <IEnumerable<UserReadDto>> GetAllUsers()
        {
            var userItems = _repository.GetAllUsers();
            return Ok(_mapper.Map<IEnumerable<UserReadDto>>(userItems));
        }

        [HttpGet("{ID}", Name="getUserByID")]
        public ActionResult <UserReadDto> GetUserByID(int ID)
        {
            var UserItem = _repository.GetUserByID(ID);
            if(UserItem == null)
                return NotFound();
            return Ok(_mapper.Map<UserReadDto>(UserItem));
        }

        [HttpPost("register")]
        public ActionResult <UserReadDto> CreateUser(UserCreateDto userCreateDto)
        {

            var newuser = new User
            {
                Name = userCreateDto.Name,
                Email = userCreateDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(userCreateDto.Password)
            };

            if(newuser == null)
                return BadRequest("Null User");

            _repository.Create(newuser);
            _repository.SaveChanges();

            var userReadDto = _mapper.Map<UserReadDto>(newuser);

            return CreatedAtRoute(nameof(GetUserByID), new {ID = userReadDto.Name}, userReadDto);
        }

        [HttpPost("Login")]
        public ActionResult Login(UserLoginDto userLogin)
        {
            var user = _repository.GetUserByEmail(userLogin.Email);


            if (user == null)
                return BadRequest("Invalid Credentials");

            if(!BCrypt.Net.BCrypt.Verify(userLogin.Password, user.Password))
                return BadRequest("Invalid Credentials");

            var jwt = _jwtService.generate(user.ID);

            Response.Cookies.Append("Jwt", jwt, new CookieOptions{
                HttpOnly= true 
            });

            return Ok(new {message = "success"});
        }

        [HttpGet("user")]
        public ActionResult User()
        {
            try{
            var jwt = Request.Cookies["Jwt"];

            var token = _jwtService.Verify(jwt);

            int userID = int.Parse(token.Issuer);

            var user = _repository.GetUserByID(userID);

            return Ok(user);
            }catch(Exception e)
            {
                return Unauthorized();
            }
        }

        [HttpPost("Logout")]
        public IActionResult LogOut()
        {
            Response.Cookies.Delete("Jwt");

            return Ok("Succes!");
        }
    }
}