using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using TeamLunch.Commands;
using TeamLunch.Controllers;
using TeamLunch.Data.Entities;
using TeamLunch.Exceptions;
using TeamLunch.Models;
using TeamLunch.Queries;

namespace TeamLunch.Tests.Controllers;

[TestFixture]
public class FineRequestsControllerTests
{

    [Test]
    public async Task GetById_GivenId_ReturnsListOfFinesForId()
    {
        // Arrange
        var stubLogger = new Mock<ILogger<FineRequestsController>>();
        var stubMediator = new Mock<IMediator>();

        stubMediator
            .Setup(mediator => mediator.Send(It.IsAny<GetFineRequestById.Query>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new GetFineRequestById.Response(1, Constants.EXAMPLE_FULLNAME, "caring too much"));

        var controller = new FineRequestsController(stubLogger.Object, stubMediator.Object);

        // Act
        var response = await controller.GetById(1);
        var okResult = response as OkObjectResult;
        var actualResult = okResult.Value as GetFineRequestById.Response;

        // Assert
        Assert.True(actualResult.fullName == Constants.EXAMPLE_FULLNAME);
    }

    [Test]
    public async Task GetById_GivenInvalidId_ReturnsNotFound()
    {
        // Arrange
        var stubLogger = new Mock<ILogger<FineRequestsController>>();
        var stubMediator = new Mock<IMediator>();

        stubMediator
            .Setup(mediator => mediator.Send(It.IsAny<GetFineRequestById.Query>(), It.IsAny<CancellationToken>()))
            .Throws<FineRequestNotFoundException>();

        var controller = new FineRequestsController(stubLogger.Object, stubMediator.Object);

        // Act
        var response = await controller.GetById(0);
        var result = response as NotFoundObjectResult;

        // Assert
        Assert.AreEqual(result.GetType(), typeof(NotFoundObjectResult));
    }
}
