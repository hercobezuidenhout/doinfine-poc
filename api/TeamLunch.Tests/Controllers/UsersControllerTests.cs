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
using TeamLunch.Data.Entities;
using TeamLunch.Exceptions;
using TeamLunch.Queries;

namespace TeamLunch.Tests.Controllers;

[TestFixture]
public class UsersControllerTests
{

    [Test]
    public async Task GetById_GivenId_ReturnsFinesForUser()
    {
        // Arrange
        var stubLogger = new Mock<ILogger<UsersController>>();
        var stubMediator = new Mock<IMediator>();

        stubMediator
            .Setup(mediator => mediator.Send(It.IsAny<GetUserById.Query>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new GetUserById.Response(Constants.EXAMPLE_USER_ID, Constants.EXAMPLE_USERNAME, Constants.EXAMPLE_FULLNAME, new List<int> { 1 }));

        var controller = new UsersController(stubLogger.Object, stubMediator.Object);

        // Act
        var response = await controller.GetById(Constants.EXAMPLE_USER_ID);
        var okResult = response as OkObjectResult;
        var actualResult = okResult.Value as GetUserById.Response;

        // Assert
        Assert.True(actualResult.username == Constants.EXAMPLE_USERNAME);
    }

    [Test]
    public async Task GetById_GivenInvalidId_ReturnsNotFound()
    {
        // Arrange
        var stubLogger = new Mock<ILogger<UsersController>>();
        var stubMediator = new Mock<IMediator>();

        stubMediator
            .Setup(mediator => mediator.Send(It.IsAny<GetUserById.Query>(), It.IsAny<CancellationToken>()))
            .Throws<UserNotFoundException>();

        var controller = new UsersController(stubLogger.Object, stubMediator.Object);

        // Act
        var response = await controller.GetById(Constants.EXAMPLE_USER_ID);
        var result = response as NotFoundObjectResult;

        // Assert
        Assert.AreEqual(result.GetType(), typeof(NotFoundObjectResult));
    }
}
