using System;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using TeamLunch.Commands;
using TeamLunch.Contracts;
using TeamLunch.Models;

namespace TeamLunch.Tests.Commands;

[TestFixture]
public class NewPaymentRequestTests : TestDataContextBase
{
    [SetUp]
    public void SetUp()
    {
        _stubContext = CreateContext();
    }

    [Test]
    public async Task Handler_GivenValidDetails_AddsRequestToDatabase()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);
        var request = new NewPaymentRequest.Command(
            Constants.EXAMPLE_USER_ID,
            DateTime.Parse("2022/10/06"),
            "telling a dad joke during standup.",
            Constants.EXAMPLE_TEAM_ID);

        var stubNotificationsService = new Mock<INotificationService>();

        stubNotificationsService
            .Setup(service => service.SendNotification(Constants.EXAMPLE_NOTIFICATION))
            .ReturnsAsync(1);

        // Act
        var mockQuery = new NewPaymentRequest.Handler(_stubContext, stubNotificationsService.Object);
        var response = await mockQuery.Handle(request, tcs.Token);

        // Assert
        Assert.NotNull(response.id);
    }

    [Test]
    public async Task Handler_GivenRequestAdded_NotificationIsSent()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);
        var command = new NewPaymentRequest.Command(
            Constants.EXAMPLE_USER_ID,
            DateTime.Parse("2022/10/06"),
            "telling a dad joke during standup.",
            Constants.EXAMPLE_TEAM_ID);

        var mockNotificationsService = new Mock<INotificationService>();

        mockNotificationsService
            .Setup(service => service.SendNotification(Constants.EXAMPLE_NOTIFICATION))
            .ReturnsAsync(1);

        // Act
        var mockQuery = new NewPaymentRequest.Handler(_stubContext, mockNotificationsService.Object);
        var response = await mockQuery.Handle(command, tcs.Token);

        // Assert
        Mock.Get(mockNotificationsService.Object).Verify(x => x.SendNotification(It.IsAny<NotificationItem>()), Times.Once);
    }
}