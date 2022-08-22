using MediatR;
using TeamLunch.Data;

namespace TeamLunch.Commands;

public static class MarkAsCompleted
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
            var fine = db.Fines.FirstOrDefault(x => x.UserId == request.id && x.Active == true);

            if (fine == null)
            {
                throw new Exception($"Requested fine with ID:{request.id} was not found");
            }

            fine.Active = false;
            db.Fines.Update(fine);
            db.SaveChanges();
            return fine.Id;
        }
    }
}