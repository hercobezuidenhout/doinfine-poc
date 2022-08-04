using TeamLunch.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace TeamLunch.Data
{
    public class DataContext : DbContext {
        public DbSet<Fine> Fines { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder) {
            builder.Entity<Fine>().HasData(
                new Fine { Id = 1, Reason = "For showing up late to a meeting." },
                new Fine { Id = 2, Reason = "For leaving a dirty pull request." }
            );
        }
    }
}