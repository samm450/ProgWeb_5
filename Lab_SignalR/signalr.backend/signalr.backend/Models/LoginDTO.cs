using System.ComponentModel.DataAnnotations;

namespace signalr.backend.Models
{
    public class LoginDTO
    {
        [Required]
        public String Email { get; set; } = null!;
        [Required]
        public String Password { get; set; } = null!;
    }
}
