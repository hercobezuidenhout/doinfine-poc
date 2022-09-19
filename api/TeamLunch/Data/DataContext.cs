using TeamLunch.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace TeamLunch.Data;

public class DataContext : DbContext
{
    public virtual DbSet<Fine> Fines { get; set; }
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Team> Teams { get; set; }
    public virtual DbSet<FineRequest> FineRequests { get; set; }
    public virtual DbSet<Notification> Notifications { get; set; }

    public DataContext() { }

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        SeedData(builder);
    }

    private void SeedData(ModelBuilder builder)
    {
        builder.Entity<User>().HasData(
            new User { Id = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", Username = "billy", FirstName = "Billy", LastName = "Anderson" },
            new User { Id = "dd760d11-91ed-4a32-9810-683f7df14239", Username = "steve", FirstName = "Steve", LastName = "Walkman" }
        );

        builder.Entity<Fine>().HasData(
            new Fine { Id = 1, Reason = "For showing up late to a meeting.", UserId = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad" },
            new Fine { Id = 2, Reason = "For leaving a dirty pull request.", UserId = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad" },
            new Fine { Id = 3, Reason = "For wearing a Manchester United shirt.", UserId = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad" },
            new Fine { Id = 4, Reason = "For pushing a secret into remote.", UserId = "dd760d11-91ed-4a32-9810-683f7df14239" },
            new Fine { Id = 5, Reason = "For not using the team's virtual background.", UserId = "dd760d11-91ed-4a32-9810-683f7df14239" },
            new Fine { Id = 6, Reason = "For leaving without completing the pull request.", UserId = "dd760d11-91ed-4a32-9810-683f7df14239" },
            new Fine { Id = 7, Reason = "For loving coffee way too much.", UserId = "dd760d11-91ed-4a32-9810-683f7df14239" }
        );

        builder.Entity<Team>().HasData(
            new Team { Id = 1, Name = "Core" }
        );

        builder.Entity<Team>()
            .HasMany(team => team.Users)
            .WithMany(user => user.Teams)
            .UsingEntity(joined => joined.HasData(
                new { TeamsId = 1, UsersId = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad" },
                new { TeamsId = 1, UsersId = "dd760d11-91ed-4a32-9810-683f7df14239" }
            ));
    }
}
