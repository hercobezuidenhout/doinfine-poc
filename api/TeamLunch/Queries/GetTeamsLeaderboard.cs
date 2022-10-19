using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Data;
using TeamLunch.Models;

namespace TeamLunch.Queries;

public static class GetTeamsLeaderboard
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
            var items = db.Teams
                .Include(team => team.Users)
                .ThenInclude(user => user.Fines)
                .Select(team => new { team.Name, team.Users })
                .ToList();

            var leaderboard = items.Select(teamWithUsers => new LeaderboardItem
            {
                Title = teamWithUsers.Name,
                Fines = teamWithUsers.Users.Sum(user => user.Fines.Count())
            })
            .ToList();

            return new Response(leaderboard);
        }
    }

    public record Response(List<LeaderboardItem> items);
}