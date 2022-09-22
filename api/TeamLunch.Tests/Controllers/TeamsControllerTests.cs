using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using TeamLunch.Controllers;
using TeamLunch.Exceptions;
using TeamLunch.Models;
using TeamLunch.Queries;

namespace TeamLunch.Tests.Controllers;

[TestFixture]
public class TeamsControllerTests
{

    [Test]
    public async Task GetById_GivenId_ReturnsTeam()
    {
        // Arrange
        var stubLogger = new Mock<ILogger<TeamsController>>();
        var stubMediator = new Mock<IMediator>();

        stubMediator
            .Setup(mediator => mediator.Send(It.IsAny<GetTeamById.Query>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new GetTeamById.Response(Constants.EXAMPLE_TEAM_ID, Constants.EXAMPLE_TEAM_NAME, new List<TeamUserItem> {
                new TeamUserItem { Id = Constants.EXAMPLE_USER_ID, FullName = Constants.EXAMPLE_FULLNAME }
             }));

        var controller = new TeamsController(stubLogger.Object, stubMediator.Object);

        // Act
        var response = await controller.GetById(Constants.EXAMPLE_TEAM_ID);
        var okResult = response as OkObjectResult;
        var actualResult = okResult.Value as GetTeamById.Response;

        // Assert
        Assert.True(actualResult.name == Constants.EXAMPLE_TEAM_NAME);
    }

    [Test]
    public async Task GetById_GivenInvalidId_ReturnsNotFound()
    {
        // Arrange
        var stubLogger = new Mock<ILogger<TeamsController>>();
        var stubMediator = new Mock<IMediator>();

        stubMediator
            .Setup(mediator => mediator.Send(It.IsAny<GetTeamById.Query>(), It.IsAny<CancellationToken>()))
            .Throws<TeamNotFoundException>();

        var controller = new TeamsController(stubLogger.Object, stubMediator.Object);

        // Act
        var response = await controller.GetById(Constants.EXAMPLE_TEAM_ID);
        var result = response as NotFoundObjectResult;

        // Assert
        Assert.AreEqual(result.GetType(), typeof(NotFoundObjectResult));
    }
}
