using TeamLunch.Data.Entities;
using TeamLunch.Models;

namespace TeamLunch.Contracts;

public interface INotificationService
{
    void SendNotificationToTeam(NotificationItem notification, Team team);
}