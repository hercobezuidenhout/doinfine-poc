using TeamLunch.Data;
using MediatR;

namespace TeamLunch.Queries
{
    public static class GetFineById {
        public record Query(int Id) : IRequest<Response>;

        public class Handler : IRequestHandler<Query, Response>
        {
            private readonly DataContext db;

            public Handler(DataContext db) {
                this.db = db;
            }

            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                var fine = db.Fines.FirstOrDefault(x => x.Id == request.Id);
                return fine == null ? null : new Response(fine.Id, fine.Reason);
            }
        }

        public record Response(int Id, string Reason);
    }
}