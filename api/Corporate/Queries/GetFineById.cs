using Corporate.Data;
using MediatR;

namespace Corporate.Queries
{
    public static class GetFineById {
        public record Query(int Id) : IRequest<Response>;

        public class Handler : IRequestHandler<Query, Response>
        {
            private readonly Repository repository;

            public Handler(Repository repository) {
                this.repository = repository;
            }

            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                var fine = repository.Fines.FirstOrDefault(x => x.Id == request.Id);
                return fine == null ? null : new Response(fine.Id, fine.Reason);
            }
        }

        public record Response(int Id, string Reason);
    }
}