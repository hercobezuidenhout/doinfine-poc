using Microsoft.AspNetCore.SignalR;
using TeamLunch.Data.Entities;

namespace TeamLunch.Hubs;

public class NotificationsHub : Hub
{
    public void SendNotification(Notification notification)
    {
        Clients.All.SendAsync("ReceiveNotification", notification);
    }
}