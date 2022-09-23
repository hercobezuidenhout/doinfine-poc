using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Data;
using TeamLunch.Exceptions;

namespace TeamLunch.Queries;

public static class GetFineRequestById
{
    public record Query(int id) : IRequest<Response>;

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
                    .Where(x => x.Responses.Where(r => (r.FineRequestId == request.id) && (r.UserId == x.Finer)).Count() == 0)
                    .First();

                var userFullName = _db.Users.Where(x => x.Id == fineRequest.Finer).Select(x => $"{x.FirstName} {x.LastName}").First();
                return new Response(fineRequest.Id, "userFullName", fineRequest.Reason);
            }
            catch (InvalidOperationException exception)
            {
                throw new FineRequestNotFoundException($"Fine request with ID: {request.id}", exception);
            }
        }
    }

    public record Response(int id, string fullName, string reason);
}