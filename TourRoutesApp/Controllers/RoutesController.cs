// Controllers/
namespace TourRoutesApp.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using TourRoutesApp.Data;
    using TourRoutesApp.Models;
    using System.Linq;

    [ApiController]
    [Route("api/[controller]")]
    public class RoutesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public RoutesController(AppDbContext context) => _context = context;

        [HttpGet("{userId}")]
        public IActionResult GetRoutesByUser(int userId)
        {
            var routes = _context.Routes
                .Where(r => r.UserId == userId)
                .Include(r => r.RoutePoints)
                    .ThenInclude(rp => rp.PointOfInterest)
                .ToList();

            return Ok(routes);
        }

        [HttpPost]
        public IActionResult Create(Route route)
        {
            _context.Routes.Add(route);
            _context.SaveChanges();
            return Created($"api/routes/{route.RouteId}", route);
        }

        [HttpPost("{routeId}/add-point")]
        public IActionResult AddPointToRoute(int routeId, [FromBody] RoutePoint routePoint)
        {
            routePoint.RouteId = routeId;
            _context.RoutePoints.Add(routePoint);
            _context.SaveChanges();
            return Ok(routePoint);
        }
    }
}