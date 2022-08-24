using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using TeamLunch.Controllers;
using TeamLunch.Models;
using TeamLunch.Queries;

namespace TeamLunch.Tests.Controllers;

[TestFixture]
public class LeaderboardControllerTests
{

    [Test]
    public async Task GetLeaderboardForUsers_ReturnsTopTenUsers()
    {
        // Arrange
        var stubLogger = new Mock<ILogger<LeaderboardController>>();
        var stubMediator = new Mock<IMediator>();

        stubMediator
            .Setup(mediator => mediator.Send(It.IsAny<GetUsersLeaderboard.Query>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new GetUsersLeaderboard.Response(new List<LeaderboardItem> {
                    new LeaderboardItem { Title = "Billy Anderson", Fines = 23 },
                    new LeaderboardItem { Title = "Billy Anderson", Fines = 23 },
                    new LeaderboardItem { Title = "Billy Anderson", Fines = 23 },
                    new LeaderboardItem { Title = "Billy Anderson", Fines = 23 },
                    new LeaderboardItem { Title = "Billy Anderson", Fines = 23 },
                    new LeaderboardItem { Title = "Billy Anderson", Fines = 23 },
            }));

        var controller = new LeaderboardController(stubLogger.Object, stubMediator.Object);

        // Act
        var response = await controller.GetLeaderboardForUsers();
        var okResult = response as OkObjectResult;
        var actualResult = okResult.Value as GetUsersLeaderboard.Response;
        var hasItems = actualResult.items.Count > 0;

        // Assert
        Assert.IsTrue(hasItems);
    }
}
