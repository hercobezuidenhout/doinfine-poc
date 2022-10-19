using MediatR;
using TeamLunch.Data;

namespace TeamLunch.Queries;

public static class GetActiveRequests
{
    public record Query(string userId) : IRequest<List<Response>>;

    public class Handler : IRequestHandler<Query, List<Response>>
    {
        private readonly DataContext _db;

        public Handler(DataContext db)
        {
            _db = db;
        }

        public async Task<List<Response>> Handle(Query request, CancellationToken cancellationToken)
        {
            var requests = _db.FineRequests
                .Where(x => !x.Responses.Where(r => r.UserId == request.userId).Any())
                .Select(x => new Response(
                    x.Id,
                    _db.Users.Where(u => u.Id == x.Finee).Select(u => $"{u.FirstName} {u.LastName}").First(),
                    x.Reason
                ))
                .ToList();

            return requests;
        }
    }

    public record Response(int id, string fullName, string reason);
}