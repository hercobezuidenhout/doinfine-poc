using TeamLunch.Data;
using TeamLunch.Data.Entities;
using MediatR;

namespace TeamLunch.Commands;

public static class UpdateNotification
{
    public record Command(string userId, int notificationId) : IRequest<Response>;

    public class Handler : IRequestHandler<Command, Response>
    {
        private readonly DataContext _db;

        public Handler(DataContext db)
        {
            _db = db;
        }

        public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
        {
            var notification = _db.UserNotifications.Where(x => x.NotificationId == request.notificationId && x.UserId == request.userId).First();
            notification.Read = true;
            _db.UserNotifications.Update(notification);
            _db.SaveChanges();

            return new Response();
        }
    }

    public record Response();
}
