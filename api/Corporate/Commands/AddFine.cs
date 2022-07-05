using Corporate.Data;
using Corporate.Data.Entities;
using MediatR;

namespace Corporate.Commands
{
    public static class AddFine {
        public record Command(string Reason) : IRequest<int>;

        public class Handler : IRequestHandler<Command, int>
        {
            private readonly Repository repository;

            public Handler(Repository repository) {
                this.repository = repository;
            }

            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                int Id = repository.Fines.Count;
                repository.Fines.Add(new Fine { Id = Id, Reason = request.Reason });
                return Id;
            }
        }
    }
}