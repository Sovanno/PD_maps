namespace TourRoutesApp.Data
{
    using Microsoft.EntityFrameworkCore;
    using TourRoutesApp.Models;

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<PointOfInterest> PointsOfInterest { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<RoutePoint> RoutePoints { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoutePoint>().HasKey(rp => rp.Id);

            modelBuilder.Entity<RoutePoint>()
                .HasOne(rp => rp.Route)
                .WithMany(r => r.RoutePoints)
                .HasForeignKey(rp => rp.RouteId);

            modelBuilder.Entity<RoutePoint>()
                .HasOne(rp => rp.PointOfInterest)
                .WithMany(p => p.RoutePoints)
                .HasForeignKey(rp => rp.PointId);
        }
    }
}
