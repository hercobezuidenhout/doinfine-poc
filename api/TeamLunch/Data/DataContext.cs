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
                    new User { Id = 1, Username = "billy", FirstName = "Billy", LastName = "Anderson" },
                    new User { Id = 2, Username = "steve", FirstName = "Steve", LastName = "Walkman" },
                    new User { Id = 3, Username = "andrew", FirstName = "Andrew", LastName = "Pint" },
                    new User { Id = 4, Username = "melissa", FirstName = "Melissa", LastName = "Care" },
                    new User { Id = 5, Username = "rebecca", FirstName = "Rebecca", LastName = "Care" }
                );

        builder.Entity<Fine>().HasData(
            new Fine { Id = 1, Reason = "For showing up late to a meeting.", UserId = 1 },
            new Fine { Id = 2, Reason = "For leaving a dirty pull request.", UserId = 1 },
            new Fine { Id = 3, Reason = "For wearing a Manchester United shirt.", UserId = 1 },
            new Fine { Id = 4, Reason = "For pushing a secret into remote.", UserId = 2 },
            new Fine { Id = 5, Reason = "For not using the team's virtual background.", UserId = 2 },
            new Fine { Id = 6, Reason = "For leaving without completing the pull request.", UserId = 2 },
            new Fine { Id = 7, Reason = "For loving coffee way too much.", UserId = 2 },
            new Fine { Id = 8, Reason = "For showing up late to the office.", UserId = 3 },
            new Fine { Id = 9, Reason = "For leaving without completing the pull request.", UserId = 4 },
            new Fine { Id = 10, Reason = "For loving coffee way too much.", UserId = 4 },
            new Fine { Id = 11, Reason = "For showing up late to the office.", UserId = 4 },
            new Fine { Id = 12, Reason = "For pushing a secret into remote.", UserId = 5 },
            new Fine { Id = 13, Reason = "For not using the team's virtual background.", UserId = 5 }
        );

        builder.Entity<Team>().HasData(
            new Team { Id = 1, Name = "Core" },
            new Team { Id = 2, Name = "Marketing" }
        );

        builder.Entity<Team>()
            .HasMany(team => team.Users)
            .WithMany(user => user.Teams)
            .UsingEntity(joined => joined.HasData(
                new { TeamsId = 1, UsersId = 1 },
                new { TeamsId = 1, UsersId = 2 },
                new { TeamsId = 1, UsersId = 3 },
                new { TeamsId = 2, UsersId = 4 },
                new { TeamsId = 2, UsersId = 5 }
            ));
    }
}
