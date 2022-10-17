using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using TeamLunch.Commands;
using TeamLunch.Contracts;
using TeamLunch.Data.Entities;
using TeamLunch.Exceptions;
using TeamLunch.Models;
using TeamLunch.Services;

namespace TeamLunch.Tests.Commands;

[TestFixture]
public class AddFineRequestResponseTests : TestDataContextBase
{
    [SetUp]
    public void SetUp()
    {
        _stubContext = CreateContext();
    }

    [Test]
    public async Task Handler_GivenRequest_ShouldSaveToDatabase()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);
        var stubNotificationsService = new Mock<INotificationService>();

        // Act
        var mockQuery = new AddFineRequestResponse.Handler(_stubContext, stubNotificationsService.Object);
        var response = await mockQuery.Handle(new AddFineRequestResponse.Command(1, Constants.EXAMPLE_USER_ID, true), tcs.Token);

        // Assert
        Assert.NotNull(response.id);
    }

    [Test]
    public async Task Handler_GivenLastRequest_ShouldSendNotification()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);
        var stubNotificationsService = new Mock<INotificationService>();


        // Act
        var mockQuery = new AddFineRequestResponse.Handler(_stubContext, stubNotificationsService.Object);
        var response = await mockQuery.Handle(new AddFineRequestResponse.Command(2, Constants.EXAMPLE_USER_ID, true), tcs.Token);

        // Assert
        Mock.Get(stubNotificationsService.Object).Verify(x => x.SendNotificationToTeam(It.IsAny<NotificationItem>(), It.IsAny<Team>()), Times.Once);
    }

    [Test]
    public async Task Handler_GivenMoreApprovals_ShouldCreateFine()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);
        var stubNotificationsService = new Mock<INotificationService>();

        // Act
        var mockQuery = new AddFineRequestResponse.Handler(_stubContext, stubNotificationsService.Object);
        var response = await mockQuery.Handle(new AddFineRequestResponse.Command(3, Constants.EXAMPLE_USER_ID, true), tcs.Token);

        // Assert
        Assert.NotNull(response.fineId);
    }

    [Test]
    public async Task Handler_GivenMoreRejections_ShouldNotCreateFine()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);
        var stubNotificationsService = new Mock<INotificationService>();

        // Act
        var mockQuery = new AddFineRequestResponse.Handler(_stubContext, stubNotificationsService.Object);
        var response = await mockQuery.Handle(new AddFineRequestResponse.Command(4, Constants.EXAMPLE_USER_ID, false), tcs.Token);

        // Assert
        Assert.Null(response.fineId);
    }

    [Test]
    public async Task Handler_GivenThatUserHasAlreadyResponded_ShouldThrowException()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);
        var stubNotificationsService = new Mock<INotificationService>();

        // Act
        var mockQuery = new AddFineRequestResponse.Handler(_stubContext, stubNotificationsService.Object);

        // Assert   
        Assert.ThrowsAsync<FineRequestNotFoundException>(async delegate
        {
            await mockQuery.Handle(new AddFineRequestResponse.Command(5, Constants.EXAMPLE_USER_ID, false), tcs.Token);
        });
    }
}