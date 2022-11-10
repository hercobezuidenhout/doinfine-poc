using MediatR;
using TeamLunch.Data;

namespace TeamLunch.Commands;

public static class MarkFineAsPaid
{
    public record Command(int id) : IRequest<int>;

    public class Handler : IRequestHandler<Command, int>
    {
        private readonly DataContext db;

        public Handler(DataContext db)
        {
            this.db = db;
        }

        public async Task<int> Handle(Command request, CancellationToken cancellationToken)
        {
            var fine = db.Fines.Where(x => x.Id == request.id).First();

            if (fine == null)
            {
                throw new Exception($"Requested fine with ID:{request.id} was not found");
            }

            fine.Paid = true;
            db.Fines.Update(fine);
            db.SaveChanges();
            return fine.Id;
        }
    }
}