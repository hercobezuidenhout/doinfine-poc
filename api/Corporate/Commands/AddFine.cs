using Corporate.Data;
using Corporate.Data.Entities;
using MediatR;

namespace Corporate.Commands
{
    public static class AddFine {
        public record Command(string Reason) : IRequest<int>;

        public class Handler : IRequestHandler<Command, int>
        {
            private readonly DataContext db;

            public Handler(DataContext db) {
                this.db = db;
            }

            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                var fine = new Fine { Reason = request.Reason };
                db.Fines.Add(fine);
                db.SaveChanges();
                return fine.Id;
            }
        }
    }
}