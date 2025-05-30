// Controllers/PointsOfInterestController.cs
namespace TourRoutesApp.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using TourRoutesApp.Data;
    using TourRoutesApp.Models;
    using System.Linq;

    [ApiController]
    [Route("api/[controller]")]
    public class PointsOfInterestController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PointsOfInterestController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.PointsOfInterest.ToList());

        [HttpPost]
        public IActionResult Create(PointOfInterest point)
        {
            _context.PointsOfInterest.Add(point);
            _context.SaveChanges();
            return Created($"api/pointsOfInterest/{point.PointId}", point);
        }
    }
}