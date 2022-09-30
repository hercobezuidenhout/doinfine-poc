using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Moq;
using NUnit.Framework;
using TeamLunch.Commands;
using TeamLunch.Models;
using TeamLunch.Services;

namespace TeamLunch.Tests.Services;

[TestFixture]
public class NotificationsServiceTests
{

    [Test]
    public async Task SendNotification_ShouldInvokeNewNotificationCommand()
    {
        // Arrange
        var stubMediator = new Mock<IMediator>();

        stubMediator
            .Setup(mediator => mediator.Send(It.IsAny<NewNotification.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new NewNotification.Response(1));

        var mockService = new NotificationService(stubMediator.Object);

        // Act
        var response = await mockService.SendNotification(new NotificationItem
        {
            Title = Constants.EXAMPLE_FULLNAME,
            Description = Constants.EXAMPLE_USERNAME,
            Link = Constants.EXAMPLE_TEAM_NAME
        });

        // Assert
        Assert.NotNull(response);
    }
}