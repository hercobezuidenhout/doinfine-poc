using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Data;
using TeamLunch.Exceptions;
using TeamLunch.Models;

namespace TeamLunch.Queries;

public static class GetTeamById
{
    public record Query(int id) : IRequest<Response>;

    public class Handler : IRequestHandler<Query, Response>
    {
        private readonly DataContext _db;

        public Handler(DataContext db)
        {
            _db = db;
        }

        public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
        {
            try
            {
                var team = _db.Teams.Where(x => x.Id == request.id).Include(x => x.Users).First();
                return new Response(team.Id, team.Name, team.Users.Select(x => new TeamUserItem
                {
                    Id = x.Id,
                    FullName = $"{x.FirstName} {x.LastName}"
                }).ToList());
            }
            catch (InvalidOperationException exception)
            {
                throw new TeamNotFoundException($"Team with id: {request.id} was not found.", exception);
            }
        }
    }

    public record Response(int id, string name, List<TeamUserItem> members);
}