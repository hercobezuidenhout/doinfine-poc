using TeamLunch.Models;

namespace TeamLunch.Contracts;

public interface INotificationService
{
    Task<int> SendNotification(NotificationItem notification);
}