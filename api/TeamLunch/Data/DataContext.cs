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

    public string DbPath { get; }

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
            .HasForeignKey(un => un.NotificationId)
            .OnDelete(DeleteBehavior.Cascade);

        SeedData(builder);
    }

    private void SeedData(ModelBuilder builder)
    {
        builder.Entity<User>().HasData(
            new User { Id = "LtdmLyKS29dB3uNfI7qMaTYQ5pa2", FirstName = "Billy", LastName = "Anderson" },
            new User { Id = "rHB5wC8hajM1PvyoMplClDlworj1", FirstName = "Steve", LastName = "Drew" },
            new User { Id = "Lcjh1S4gKJaPbOjWB56BUs9hS5u2", FirstName = "Herco", LastName = "Bezuidenhout" }
        );

        builder.Entity<Fine>().HasData(
            new Fine { Id = 1, Reason = "For showing up late to a meeting.", UserId = "LtdmLyKS29dB3uNfI7qMaTYQ5pa2" },
            new Fine { Id = 2, Reason = "For leaving a dirty pull request.", UserId = "LtdmLyKS29dB3uNfI7qMaTYQ5pa2" },
            new Fine { Id = 3, Reason = "For wearing a Manchester United shirt.", UserId = "LtdmLyKS29dB3uNfI7qMaTYQ5pa2" },
            new Fine { Id = 4, Reason = "For not caring enough about water.", UserId = "rHB5wC8hajM1PvyoMplClDlworj1" },
            new Fine { Id = 5, Reason = "For not using the team's virtual background.", UserId = "rHB5wC8hajM1PvyoMplClDlworj1" },
            new Fine { Id = 6, Reason = "For leaving without completing the pull request.", UserId = "rHB5wC8hajM1PvyoMplClDlworj1" },
            new Fine { Id = 7, Reason = "For loving coffee way too much.", UserId = "rHB5wC8hajM1PvyoMplClDlworj1" }
        );

        builder.Entity<Team>().HasData(
            new Team { Id = 1, Name = "Core", SegmentId = 6 }
        );

        builder.Entity<FineRequest>().HasData(
            new FineRequest { Id = 1, TeamId = 1, Finer = "LtdmLyKS29dB3uNfI7qMaTYQ5pa2", Finee = "rHB5wC8hajM1PvyoMplClDlworj1", Reason = "not caring enough about water" },
            new FineRequest { Id = 2, TeamId = 1, Finer = "rHB5wC8hajM1PvyoMplClDlworj1", Finee = "Lcjh1S4gKJaPbOjWB56BUs9hS5u2", Reason = "not caring enough about dogs" },
            new FineRequest { Id = 3, TeamId = 1, Finer = "Lcjh1S4gKJaPbOjWB56BUs9hS5u2", Finee = "rHB5wC8hajM1PvyoMplClDlworj1", Reason = "not caring enough about something else" },
            new FineRequest { Id = 4, TeamId = 1, Finer = "Lcjh1S4gKJaPbOjWB56BUs9hS5u2", Finee = "rHB5wC8hajM1PvyoMplClDlworj1", Reason = "not caring enough about something else" },
            new FineRequest { Id = 5, TeamId = 1, Finer = "Lcjh1S4gKJaPbOjWB56BUs9hS5u2", Finee = "rHB5wC8hajM1PvyoMplClDlworj1", Reason = "not caring enough about something else" }
        );
        builder.Entity<PaymentRequest>().HasData(
            new PaymentRequest { Id = 1, TeamId = 1, UserId = "LtdmLyKS29dB3uNfI7qMaTYQ5pa2", Action = "telling a dad-joke during standup" }
        );

        builder.Entity<FineRequestResponse>().HasData(
            new FineRequestResponse { Id = 1, FineRequestId = 5, UserId = "LtdmLyKS29dB3uNfI7qMaTYQ5pa2", Approved = true }
        );

        builder.Entity<Team>()
            .HasMany(team => team.Users)
            .WithMany(user => user.Teams)
            .UsingEntity(joined => joined.HasData(
                new { TeamsId = 1, UsersId = "LtdmLyKS29dB3uNfI7qMaTYQ5pa2" },
                new { TeamsId = 1, UsersId = "rHB5wC8hajM1PvyoMplClDlworj1" },
                new { TeamsId = 1, UsersId = "Lcjh1S4gKJaPbOjWB56BUs9hS5u2" }
            ));
    }
}
