using MediatR;
using TeamLunch.Commands;
using TeamLunch.Contracts;
using TeamLunch.Data.Entities;
using TeamLunch.Models;

namespace TeamLunch.Services;

public class NotificationService : INotificationService
{
    private readonly IMediator _mediator;

    public NotificationService(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async void SendNotificationToTeam(NotificationItem notification, Team team)
    {
        var response = await _mediator.Send(new NewTeamNotification.Command
        {
            TeamId = team.Id,
            Title = notification.Title,
            Description = notification.Description,
            Link = notification.Link
        });

        var userNotifications = new List<UserNotification>();

        foreach (var user in team.Users)
        {
            userNotifications.Add(new UserNotification
            {
                UserId = user.Id,
                NotificationId = response.id,
                Read = false
            });
        }

        await _mediator.Send(new AddUserNotifications.Command(userNotifications));
    }
}
