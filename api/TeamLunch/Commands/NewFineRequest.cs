using MediatR;
using TeamLunch.Data;
using TeamLunch.Data.Entities;

namespace TeamLunch.Commands;

public static class NewFineRequest
{
    public class Command : IRequest<int>
    {
        public string Finer { get; set; }
        public string Finee { get; set; }
        public string Reason { get; set; }
    }

    public class Handler : IRequestHandler<Command, int>
    {
        private readonly DataContext db;

        public Handler(DataContext db)
        {
            this.db = db;
        }

        public async Task<int> Handle(Command request, CancellationToken cancellationToken)
        {
            var fineRequest = new FineRequest { Finer = request.Finer, Finee = request.Finee, Reason = request.Reason };
            db.Add(fineRequest);
            db.SaveChanges();

            return fineRequest.Id;
        }
    }
}