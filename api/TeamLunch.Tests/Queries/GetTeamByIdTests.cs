using System.Threading;
using System.Threading.Tasks;
using NUnit.Framework;
using TeamLunch.Exceptions;
using TeamLunch.Queries;

namespace TeamLunch.Tests.Queries;

[TestFixture]
public class GetTeamByIdTests : TestDataContextBase
{
    [SetUp]
    public void SetUp()
    {
        _stubContext = CreateContext();
    }

    [Test]
    public async Task Handle_GivenValidId_ReturnsTeam()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetTeamById.Handler(_stubContext);
        var team = await mockQuery.Handle(new GetTeamById.Query(Constants.EXAMPLE_TEAM_ID), tcs.Token);

        // Assert
        Assert.AreEqual(Constants.EXAMPLE_TEAM_NAME, team.name);
    }

    [Test]
    public async Task Handle_GivenInvalidId_ThrowsException()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);


        // Act
        var mockQuery = new GetTeamById.Handler(_stubContext);

        // Assert
        Assert.ThrowsAsync<TeamNotFoundException>(async delegate
        {
            await mockQuery.Handle(new GetTeamById.Query(0), tcs.Token);
        });
    }

    [Test]
    public async Task Handle_GivenValidId_ReturnsTeamWithUsers()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetTeamById.Handler(_stubContext);
        var team = await mockQuery.Handle(new GetTeamById.Query(Constants.EXAMPLE_TEAM_ID), tcs.Token);
        var usersCount = team.members.Count;

        // Assert
        Assert.GreaterOrEqual(usersCount, 1);
    }
}