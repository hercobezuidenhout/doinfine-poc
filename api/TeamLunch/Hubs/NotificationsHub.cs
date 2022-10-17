using Microsoft.AspNetCore.SignalR;
using TeamLunch.Data.Entities;

namespace TeamLunch.Hubs;

public class NotificationsHub : Hub
{
    public Task JoinRoom(string name)
    {
        return Groups.AddToGroupAsync(Context.ConnectionId, name);
    }

    public Task LeaveRoom(string name)
    {
        return Groups.RemoveFromGroupAsync(Context.ConnectionId, name);
    }

    public void SendNotification(Notification notification)
    {
        Clients.All.SendAsync("ReceiveNotification", notification);
    }
}