using System.ComponentModel.DataAnnotations;

namespace signalr.backend.Models
{
    public class LoginResultDTO
    {
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
