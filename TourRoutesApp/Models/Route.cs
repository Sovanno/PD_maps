namespace TourRoutesApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    public class Route
    {
        [Key] public int RouteId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public User User { get; set; }
        public List<RoutePoint> RoutePoints { get; set; }
    }
}