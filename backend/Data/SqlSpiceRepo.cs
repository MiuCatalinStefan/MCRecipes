using System;
using System.Collections.Generic;
using System.Linq;
using MC_Api.Models;

namespace MC_Api.Data
{
    public class SqlSpiceRepo : ISpiceRepo
    {
        private readonly MC_ApiContext _context;

        public SqlSpiceRepo(MC_ApiContext context)
        {
            _context = context;
        }

        public void CreateSpice(Spice spc)
        {
            if(spc == null)
            {
                throw new ArgumentNullException(nameof(spc));
            }

            _context.Spices.Add(spc);

        }

        public void DeleteSpice(Spice spc)
        {
            if(spc == null)
            {
                throw new ArgumentNullException(nameof(spc));
            }

            _context.Spices.Remove(spc);
        }

        public IEnumerable<Spice> GetAllSpices()
        {
            return _context.Spices.ToList();
        }

        public Spice GetSpiceByID(int id)
        {
            return _context.Spices.FirstOrDefault(p => p.ID == id);
        }

        public Spice GetSpiceByName(string name)
        {
            return _context.Spices.FirstOrDefault(p => p.Name == name);

        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void UpdateSpice(Spice spc)
        {
           // Nothing lol
        }
    }
}