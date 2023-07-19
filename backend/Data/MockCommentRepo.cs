using System.Collections.Generic;
using MC_Api.Models;

namespace MC_Api.Data
{
    public class MockCommentRepo : ICommentRepo
    {
        public IEnumerable<Comment> GetAllComments()
        {
            var comments = new List<Comment>
            {
                new Comment{ID=0, Name="Ionel", Text="A fost fantastika supa de pula!"},
                new Comment{ID=1, Name="Ionela", Text="NU a fost fantasticca pula la plita!"}
            };

            return comments;
        }
    }
}