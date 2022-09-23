using TeamLunch.Data;
using MediatR;
using TeamLunch.Data.Entities;

namespace TeamLunch.Queries;
public static class GetFineById
{
    public record Query(string Id) : IRequest<Response>;

    public class Handler : IRequestHandler<Query, Response>
    {
        private readonly DataContext db;

        public Handler(DataContext db)
        {
            this.db = db;
        }

        public async Task<Response?> Handle(Query request, CancellationToken cancellationToken)
        {
            var fines = db.Fines.Where(x => x.UserId == request.Id && x.Paid == false).ToList();
            return new Response(fines);
        }
    }

    public record Response(List<Fine> fines);
}