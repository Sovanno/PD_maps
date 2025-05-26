namespace TourRoutesApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class User
    {
        [Key] public int UserId { get; set; }
        [Required] public string Username { get; set; }
        [Required] public string Email { get; set; }
        public bool HasSubscription { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Route> Routes { get; set; }
    }
}