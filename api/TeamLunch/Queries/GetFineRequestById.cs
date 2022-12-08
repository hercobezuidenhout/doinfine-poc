using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Data;
using TeamLunch.Enums;
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
                    .Where(x => x.Status == RequestStatus.Pending)
                    .Where(x => !x.Responses.Any(r => r.UserId == request.userId && r.FineRequestId == request.id))
                    .First();

                var team = _db.Teams
                    .Where(x => x.Id == fineRequest.TeamId)
                    .Select(x => x.Users)
                    .First();

                if (team.Count() == 4)
                {
                    if (fineRequest.Finee == request.userId) throw new InvalidOperationException();
                }
                else
                {
                    if ((fineRequest.Finee == request.userId) || (fineRequest.Finer == request.userId)) throw new InvalidOperationException();
                }

                var finer = _db.Users.Where(x => x.Id == fineRequest.Finer).Select(x => $"{x.FirstName} {x.LastName}").First();
                var finee = _db.Users.Where(x => x.Id == fineRequest.Finee).Select(x => $"{x.FirstName} {x.LastName}").First();
                return new Response(fineRequest.Id, finer, finee, fineRequest.Reason);
            }
            catch (InvalidOperationException exception)
            {
                throw new FineRequestNotFoundException($"Fine request not found with ID: {request.id}", exception);
            }
        }
    }

    public record Response(int id, string finer, string finee, string reason);
}