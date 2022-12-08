using MediatR;
using TeamLunch.Data;
using TeamLunch.Enums;

namespace TeamLunch.Queries;

public static class GetActiveFineRequests
{
    public record Query(string userId, int teamId) : IRequest<List<Response>>;

    public class Handler : IRequestHandler<Query, List<Response>>
    {
        private readonly DataContext _db;

        public Handler(DataContext db)
        {
            _db = db;
        }

        public async Task<List<Response>> Handle(Query request, CancellationToken cancellationToken)
        {
            var teamUsers = _db.Teams.Where(x => x.Id == request.teamId).Select(x => x.Users).First();
            var user = _db.Users.Where(x => x.Id == request.userId).First();

            if (!teamUsers.Contains(user)) throw new UnauthorizedAccessException("User does not have access to this team");


            var requests = _db.FineRequests
                .Where(x => x.TeamId == request.teamId)
                .Where(x => !x.Responses.Where(r => r.UserId == request.userId).Any())
                .Where(x => teamUsers.Count() == 4 ? !(x.Finee == request.userId) : !((x.Finee == request.userId) || (x.Finer == request.userId)))
                .Where(x => x.Status == RequestStatus.Pending)
                .Select(x => new Response(
                    x.Id,
                    _db.Users.Where(u => u.Id == x.Finer).Select(u => $"{u.FirstName} {u.LastName}").First(),
                    _db.Users.Where(u => u.Id == x.Finee).Select(u => $"{u.FirstName} {u.LastName}").First(),
                    x.Reason
                ))
                .ToList();

            return requests;
        }
    }

    public record Response(int id, string finer, string finee, string reason);
}