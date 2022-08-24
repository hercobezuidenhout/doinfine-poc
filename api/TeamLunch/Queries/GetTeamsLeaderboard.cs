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
            .Select(team => new LeaderboardItem
            {
                Title = team.Name,
                Fines = team.Users.Select(user => user.Fines.Count).Sum()
            })
            .OrderByDescending(item => item.Fines)
            .ToList();

            return new Response(items);
        }
    }

    public record Response(List<LeaderboardItem> items);
}