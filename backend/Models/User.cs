using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MC_Api.Models
{
    
    public class User
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        [JsonIgnore] public string Password { get; set; }

        public string Authorization {get; set;}
    } 
}