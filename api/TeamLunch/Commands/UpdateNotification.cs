using TeamLunch.Data;
using TeamLunch.Data.Entities;
using MediatR;

namespace TeamLunch.Commands;

public static class UpdateNotification
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
            var notification = db.Notifications.Where(x => x.Id == request.id).First();
            notification.Read = true;
            db.Notifications.Update(notification);
            db.SaveChanges();
            return notification.Id;
        }
    }
}
