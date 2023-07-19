using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MC_Api.Models;

namespace MC_Api.Dtos.Tags
{
    public class TagCreateDto
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}