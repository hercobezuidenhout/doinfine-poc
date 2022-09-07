using MediatR;
using Microsoft.AspNetCore.SignalR;
using TeamLunch.Data;
using TeamLunch.Data.Entities;
using TeamLunch.Hubs;

namespace TeamLunch.Commands;

public static class NewNotification
{
    public class Command : IRequest<int>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
    }

    public class Handler : IRequestHandler<Command, int>
    {
        private readonly DataContext db;
        private IHubContext<NotificationsHub> notificationsHub;

        public Handler(DataContext db, IHubContext<NotificationsHub> notificationsHub)
        {
            this.db = db;
            this.notificationsHub = notificationsHub;
        }

        public async Task<int> Handle(Command request, CancellationToken cancellationToken)
        {
            var notification = new Notification
            {
                Title = request.Title,
                Description = request.Description,
                Link = request.Link,
                Read = false
            };

            db.Add(notification);
            db.SaveChanges();

            await notificationsHub.Clients.All.SendAsync("ReceiveNofication", notification);

            return notification.Id;
        }
    }
}