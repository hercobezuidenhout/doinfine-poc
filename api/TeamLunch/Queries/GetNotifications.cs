using TeamLunch.Data;
using MediatR;
using TeamLunch.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace TeamLunch.Queries
{
    public static class GetNotifications
    {
        public record Query(string userId) : IRequest<Response>;

        public class Handler : IRequestHandler<Query, Response>
        {
            private readonly DataContext _db;

            public Handler(DataContext db)
            {
                _db = db;
            }

            public async Task<Response?> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    var notifications = _db.Notifications
                        .Where(x => x.UserNotifications
                            .Any(notification => notification.UserId == request.userId && !notification.Read)
                        )
                        .ToList();
                    return new Response(notifications);
                }
                catch (InvalidOperationException exception)
                {
                    return new Response(new List<Notification>());
                }
            }
        }

        public record Response(List<Notification> notifications);
    }
}