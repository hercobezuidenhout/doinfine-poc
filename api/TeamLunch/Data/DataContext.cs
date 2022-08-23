using TeamLunch.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace TeamLunch.Data;

public class DataContext : DbContext
{
    public virtual DbSet<Fine> Fines { get; set; }
    public virtual DbSet<User> Users { get; set; }

    public DataContext() { }

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>().HasData(
            new User { Id = 1, Username = "billy", FirstName = "Billy", LastName = "Anderson" },
            new User { Id = 2, Username = "steve", FirstName = "Steve", LastName = "Walkman" },
            new User { Id = 3, Username = "andrew", FirstName = "Andrew", LastName = "Pint" }
        );

        builder.Entity<Fine>().HasData(
            new Fine { Id = 1, Reason = "For showing up late to a meeting.", UserId = 1 },
            new Fine { Id = 2, Reason = "For leaving a dirty pull request.", UserId = 1 },
            new Fine { Id = 3, Reason = "For wearing a Manchester United shirt.", UserId = 1 },
            new Fine { Id = 4, Reason = "For pushing a secret into remote.", UserId = 2 },
            new Fine { Id = 5, Reason = "For not using the team's virtual background.", UserId = 2 },
            new Fine { Id = 6, Reason = "For leaving without completing the pull request.", UserId = 2 },
            new Fine { Id = 7, Reason = "For loving coffee way too much.", UserId = 2 },
            new Fine { Id = 8, Reason = "For showing up late to the office.", UserId = 3 }
        );
    }
}
