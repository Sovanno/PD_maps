namespace TourRoutesApp.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using TourRoutesApp.Data;
    using TourRoutesApp.Models;
    using System.Linq;

    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Users.ToList());

        [HttpGet("{id}")]
        public IActionResult Get(int id) => Ok(_context.Users.Find(id));

        [HttpPost]
        public IActionResult Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return Created($"api/users/{user.UserId}", user);
        }
    }
}