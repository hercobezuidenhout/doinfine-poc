using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Data;
using TeamLunch.Exceptions;

namespace TeamLunch.Queries;

public static class GetFineRequestById
{
    public record Query(int id, string userId) : IRequest<Response>;

    public class Handler : IRequestHandler<Query, Response>
    {
        private readonly DataContext _db;

        public Handler(DataContext db)
        {
            _db = db;
        }

        public async Task<Response?> Handle(Query request, CancellationToken cancellationToken)
        {
            try
            {
                var fineRequest = _db.FineRequests
                    .Where(x => x.Id == request.id)
                    .Where(x => !x.Responses.Any(r => r.UserId == request.userId && r.FineRequestId == request.id))
                    .First();

                var userFullName = _db.Users.Where(x => x.Id == fineRequest.Finee).Select(x => $"{x.FirstName} {x.LastName}").First();
                return new Response(fineRequest.Id, userFullName, fineRequest.Reason);
            }
            catch (InvalidOperationException exception)
            {
                throw new FineRequestNotFoundException($"Fine request not found with ID: {request.id}", exception);
            }
        }
    }

    public record Response(int id, string fullName, string reason);
}