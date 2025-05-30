using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TourRoutesApp.Data;
using TourRoutesApp.Models;
using TourRoutesApp.Dto;
using System.Linq;
using RouteModel = TourRoutesApp.Models.Route;

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
    public IActionResult Create([FromBody] RouteCreateDto dto)
    {
        var route = new RouteModel
        {
            UserId = dto.UserId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Routes.Add(route);
        _context.SaveChanges();

        foreach (var pointDto in dto.Points)
        {
            var point = new PointOfInterest
            {
                PointName = pointDto.Name,
                Address = pointDto.Address,
                Description = pointDto.Description,
                CreatedAt = DateTime.UtcNow
            };
            _context.PointsOfInterest.Add(point);
            _context.SaveChanges();

            var routePoint = new RoutePoint
            {
                RouteId = route.RouteId,
                PointId = point.PointId,
                PointOrder = pointDto.Order
            };
            _context.RoutePoints.Add(routePoint);
        }

        _context.SaveChanges();

        return Created($"api/routes/{route.RouteId}", route);
    }
}

public class RouteCreateDto
{
    public int UserId { get; set; }
    public List<RoutePointCreateDto> Points { get; set; } = new List<RoutePointCreateDto>();
}

public class RoutePointCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Order { get; set; }
}

public class RouteDto
{
    public int RouteId { get; set; }
    public int UserId { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<RoutePointDto> Points { get; set; }  = new List<RoutePointDto>();
}

public class RoutePointDto
{
    public int PointId { get; set; }
    public string Name { get; set; }  = null!;
    public string Address { get; set; }  = null!;
    public string Description { get; set; }  = null!;
    public int Order { get; set; }
}
