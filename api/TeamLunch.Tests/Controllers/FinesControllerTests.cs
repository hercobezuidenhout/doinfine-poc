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
using TeamLunch.Queries;

namespace TeamLunch.Tests.Controllers;

[TestFixture]
public class FineControllerTests
{

    [Test]
    public async Task GetById_GivenId_ReturnsListOfFinesForId()
    {
        // Arrange
        var stubLogger = new Mock<ILogger<FineController>>();
        var stubMediator = new Mock<IMediator>();

        stubMediator
            .Setup(mediator => mediator.Send(It.IsAny<GetFineById.Query>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new GetFineById.Response(new List<Fine> {
                    new Fine { Id = 1, UserId = Constants.EXAMPLE_USER_ID, Reason = "For showing up late" }
            }));

        var controller = new FineController(stubLogger.Object, stubMediator.Object);

        // Act
        var response = await controller.GetById(Constants.EXAMPLE_USER_ID);
        var okResult = response as OkObjectResult;
        var actualResult = okResult.Value as GetFineById.Response;
        var hasFines = actualResult.fines.Count > 0;

        // Assert
        Assert.True(hasFines);
    }
}
