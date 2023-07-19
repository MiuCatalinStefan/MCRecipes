using System.Collections.Generic;
using MC_Api.Data;
using MC_Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace MC_Api.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentRepo _repository;

        public CommentsController(ICommentRepo repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult <IEnumerable<Comment>> GetAllComments()
        {
            var CommentItems = _repository.GetAllComments();
            return Ok(CommentItems);
        }

    }
}