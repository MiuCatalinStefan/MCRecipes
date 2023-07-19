using System.Collections.Generic;
using MC_Api.Models;

namespace MC_Api.Data
{
    public interface ICommentRepo
    {
        IEnumerable<Comment> GetAllComments();
    }
}