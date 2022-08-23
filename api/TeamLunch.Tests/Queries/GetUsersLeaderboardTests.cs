using System.Threading;
using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using TeamLunch.Data;
using TeamLunch.Queries;
using TeamLunch.Tests.Fakes;

namespace TeamLunch.Tests.Queries;

[TestFixture]
public class GetUsersLeaderboardTests
{

    Mock<DataContext> stubContext;

    [SetUp]
    public void SetUp()
    {
        stubContext = new FakeDataContext().Create();
    }

    [Test]
    public async Task GetUsersLeaderboard_ReturnsListOfTopTenUsers()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetUsersLeaderboard.Handler(stubContext.Object);
        var response = await mockQuery.Handle(new GetUsersLeaderboard.Query(), tcs.Token);
        var hasCorrectAmountOfItems = (response.items.Count <= 10) && (response.items.Count > 0);

        // Assert
        Assert.True(hasCorrectAmountOfItems);
    }
}