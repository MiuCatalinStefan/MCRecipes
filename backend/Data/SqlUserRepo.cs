using System;
using System.Collections.Generic;
using MC_Api.Models;
using System.Linq;

namespace MC_Api.Data
{
    public class SqlUserRepo : IUserRepo
    {
        private readonly MC_ApiContext _context;

        public SqlUserRepo(MC_ApiContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(p => p.Email == email);
        }

        public User GetUserByID(int ID)
        {
            return _context.Users.FirstOrDefault(p => p.ID == ID);
        }

        public bool SaveChanges()
        {
           return (_context.SaveChanges() >= 0);
        }

        void IUserRepo.Create(User user)
        {
                if(user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            _context.Users.Add(user);
        }
        }
    }