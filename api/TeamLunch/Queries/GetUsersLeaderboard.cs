using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Data;
using TeamLunch.Models;

namespace TeamLunch.Queries;

public static class GetUsersLeaderboard
{
    public record Query : IRequest<Response>;
    public class Handler : IRequestHandler<Query, Response>
    {
        private DataContext db;

        public Handler(DataContext db)
        {
            this.db = db;
        }

        public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
        {
            var items = db.Users
                .Include(user => user.Fines)
                .Select(user => new LeaderboardItem
                {
                    Title = $"{user.FirstName} {user.LastName}",
                    Fines = user.Fines.Count
                })
                .Where(x => x.Fines > 0)
                .OrderByDescending(item => item.Fines)
                .Take(10)
                .ToList();

            return new Response(items);
        }
    }

    public record Response(List<LeaderboardItem> items);
}