using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Data;
using TeamLunch.Exceptions;

namespace TeamLunch.Queries;

public static class GetUserById
{
    public record Query(string id) : IRequest<Response>;

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
                var user = _db.Users.Where(x => x.Id == request.id).Include(x => x.Teams).First();
                return new Response(
                    user.Id,
                    string.Concat(user.FirstName, " ", user.LastName),
                    user.Teams.Select(x => x.Id).ToList()
                );
            }
            catch (InvalidOperationException exception)
            {
                throw new UserNotFoundException($"The user with id {request.id} was not found.", exception);
            }
        }
    }
    public record Response(string id, string fullName, List<int> teams);
}