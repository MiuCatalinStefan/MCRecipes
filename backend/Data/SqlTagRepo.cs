using System;
using System.Collections.Generic;
using System.Linq;
using MC_Api.Models;
using Microsoft.EntityFrameworkCore;

namespace MC_Api.Data
{
    public class SqlTagRepo : ITagRepo
    {
        private readonly MC_ApiContext _context;

        public SqlTagRepo(MC_ApiContext context)
        {
            _context = context;
        }


        public void CreateTag(Tag tag)
        {
            if(tag == null)
            {
                throw new ArgumentNullException(nameof(tag));
            }

            _context.Tags.Add(tag);
        }

        public void DeleteTag(Tag tag)
        {
            if(tag == null)
            {
                throw new ArgumentNullException(nameof(tag));
            }

            _context.Tags.Remove(tag);
        }

        public IEnumerable<Tag> GetAllTags()
        {
            return _context.Tags
                    .Include(a => a.Recipes)
                    .ToList();
        }

        public Tag GetTagByID(int id)
        {
            return _context.Tags.FirstOrDefault(p => p.TagID == id);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void UpdateTag(Tag tag)
        {
            
        }
    }
}