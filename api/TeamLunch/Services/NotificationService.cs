using MediatR;
using TeamLunch.Commands;
using TeamLunch.Contracts;
using TeamLunch.Models;

namespace TeamLunch.Services;

public class NotificationService : INotificationService
{
    private readonly IMediator _mediator;

    public NotificationService(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task<int> SendNotification(NotificationItem notification)
    {
        var response = await _mediator.Send(new NewNotification.Command
        {
            Title = notification.Title,
            Description = notification.Description,
            Link = notification.Link
        });

        return response.id;
    }
}
