﻿using System.ComponentModel.DataAnnotations;

namespace signalr.backend.Models
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
        [Required]
        public string PasswordConfirm { get; set; } = null!;
    }
}
