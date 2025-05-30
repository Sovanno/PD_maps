namespace TourRoutesApp.Models
{
    using System.ComponentModel.DataAnnotations;
    
    public class RoutePoint
    {
        [Key] public int Id { get; set; }
        public int RouteId { get; set; }
        public int PointId { get; set; }
        public int PointOrder { get; set; }

        public Route Route { get; set; } = null!;
        public PointOfInterest PointOfInterest { get; set; } = null!;
    }
}