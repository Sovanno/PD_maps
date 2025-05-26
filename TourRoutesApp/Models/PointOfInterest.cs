// Models/PointOfInterest.cs
namespace TourRoutesApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class PointOfInterest
    {
        [Key] public int PointId { get; set; }
        [Required] public string PointName { get; set; }
        [Required] public string Address { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<RoutePoint> RoutePoints { get; set; }
    }
}