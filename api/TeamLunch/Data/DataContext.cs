using TeamLunch.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace TeamLunch.Data;

public class DataContext : DbContext
{
    public virtual DbSet<Fine> Fines { get; set; }
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Team> Teams { get; set; }
    public virtual DbSet<FineRequest> FineRequests { get; set; }
    public virtual DbSet<FineRequestResponse> FineRequestResponses { get; set; }
    public virtual DbSet<PaymentRequest> PaymentRequests { get; set; }
    public virtual DbSet<PaymentRequestResponse> PaymentRequestResponses { get; set; }
    public virtual DbSet<Payment> Payments { get; set; }
    public virtual DbSet<Notification> Notifications { get; set; }
    public virtual DbSet<UserNotification> UserNotifications { get; set; }

    public DataContext() { }

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder
            .Entity<UserNotification>()
            .HasKey(key => new { key.UserId, key.NotificationId });

        builder.Entity<UserNotification>()
            .HasOne(un => un.User)
            .WithMany(u => u.UserNotifications)
            .HasForeignKey(un => un.UserId);

        builder.Entity<UserNotification>()
            .HasOne(un => un.Notification)
            .WithMany(n => n.UserNotifications)
            .HasForeignKey(un => un.NotificationId);

        // SeedData(builder);
    }

    private void SeedData(ModelBuilder builder)
    {
        builder.Entity<User>().HasData(
            new User { Id = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", FirstName = "Billy", LastName = "Anderson" },
            new User { Id = "dd760d11-91ed-4a32-9810-683f7df14239", FirstName = "Steve", LastName = "Walkman" }
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
            new Team { Id = 1, Name = "Core", SegmentId = 1 }
        );

        builder.Entity<FineRequest>().HasData(
            new FineRequest { Id = 1, TeamId = 1, Finer = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", Finee = "dd760d11-91ed-4a32-9810-683f7df14239", Reason = "not caring enough about water" },
            new FineRequest { Id = 2, TeamId = 1, Finer = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", Finee = "dd760d11-91ed-4a32-9810-683f7df14239", Reason = "not caring enough about dogs" },
            new FineRequest { Id = 3, TeamId = 1, Finer = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", Finee = "dd760d11-91ed-4a32-9810-683f7df14239", Reason = "not caring enough about something else" },
            new FineRequest { Id = 4, TeamId = 1, Finer = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", Finee = "dd760d11-91ed-4a32-9810-683f7df14239", Reason = "not caring enough about something else" },
            new FineRequest { Id = 5, TeamId = 1, Finer = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", Finee = "dd760d11-91ed-4a32-9810-683f7df14239", Reason = "not caring enough about something else" }
        );

        builder.Entity<FineRequestResponse>().HasData(
            new FineRequestResponse { Id = 1, FineRequestId = 5, UserId = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", Approved = true }
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
