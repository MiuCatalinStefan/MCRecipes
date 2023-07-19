using System.Collections.Generic;
using MC_Api.Models;

namespace MC_Api.Data
{
    public interface ISpiceRepo
    {
        IEnumerable<Spice> GetAllSpices();
        
        Spice GetSpiceByName(string name);

        Spice GetSpiceByID(int id);

        void CreateSpice(Spice spc);

        bool SaveChanges();

        void UpdateSpice(Spice spc);

        void DeleteSpice(Spice spc);

    }
}