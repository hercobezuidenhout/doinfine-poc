using TeamLunch.Data;
using MediatR;
using TeamLunch.Data.Entities;

namespace TeamLunch.Queries
{
    public static class GetNotifications
    {
        public record Query() : IRequest<Response>;

        public class Handler : IRequestHandler<Query, Response>
        {
            private readonly DataContext db;

            public Handler(DataContext db)
            {
                this.db = db;
            }

            public async Task<Response?> Handle(Query request, CancellationToken cancellationToken)
            {
                var notifications = db.Notifications.Where(notification => notification.Read == false).ToList();
                return new Response(notifications);
            }
        }

        public record Response(List<Notification> notifications);
    }
}