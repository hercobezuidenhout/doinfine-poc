using MediatR;
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
            var users = db.Users.ToList();
            var items = new List<LeaderboardItem> {
                new LeaderboardItem { Title = "Something", Fines = 20 }
            };
            return new Response(items);
        }
    }

    public record Response(List<LeaderboardItem> items);
}