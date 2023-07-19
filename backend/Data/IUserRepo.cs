using System.Collections.Generic;
using MC_Api.Models;

namespace MC_Api.Data
{
    public interface IUserRepo
    {
        void Create(User user);
        bool SaveChanges();

        IEnumerable<User> GetAllUsers();

        User GetUserByID(int ID);

        User GetUserByEmail(string email);
    }

    
}