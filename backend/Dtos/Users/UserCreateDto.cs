using System.ComponentModel.DataAnnotations;

namespace MC_Api.Dtos
{
    public class UserCreateDto
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}