using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MC_Api.Dtos.Spice
{
    public class SpiceReadDto
    {
        public int ID {get; set;}
        public string Name { get; set; }
        public string Photo { get; set; }
        public string Description { get; set; }
    }
}