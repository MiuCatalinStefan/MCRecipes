using System.Collections.Generic;
using MC_Api.Models;

namespace MC_Api.Data.MockRepos
{
    public class MockSpiceRepo : ISpiceRepo
    {
        public void CreateSpice(Spice spc)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteSpice(Spice spc)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Spice> GetAllSpices()
        {
            var spices = new List<Spice>
            {
                new Spice{ID=0, Name="Sare", Description="E buna"},
                new Spice{ID=1, Name="Piper", Description="E iute"},
                new Spice{ID=2, Name="Pudra de chilli", Description="E si mai iute"},
                new Spice{ID=3, Name="Curcuma", Description="E galbena"},
                new Spice{ID=4, Name="Paprica", Description="E rosie"},
                new Spice{ID=5, Name="Sos de soia", Description="E negru"}
            };

            return spices;

        }

        public Spice GetRecipeByName(string name)
        {
            return new Spice{ID=0, Name="Sare", Description="E buna"};
        }

        public Spice GetSpiceByID(int id)
        {
            throw new System.NotImplementedException();
        }

        public Spice GetSpiceByName(string name)
        {
            throw new System.NotImplementedException();
        }

        public bool SaveChanges()
        {
            throw new System.NotImplementedException();
        }

        public void UpdateSpice(Spice cpc)
        {
            throw new System.NotImplementedException();
        }
    }
}