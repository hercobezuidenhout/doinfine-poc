using System.Threading;
using System.Threading.Tasks;
using NUnit.Framework;
using TeamLunch.Data;
using TeamLunch.Queries;

namespace TeamLunch.Tests.Queries;

[TestFixture]
public class GetUsersLeaderboardTests : TestDataContextBase
{

    [SetUp]
    public void SetUp()
    {
        _stubContext = new DataContext(_contextOptions);
    }

    [Test]
    public async Task GetUsersLeaderboard_ReturnsListOfTopTenUsers()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetUsersLeaderboard.Handler(_stubContext);
        var response = await mockQuery.Handle(new GetUsersLeaderboard.Query(), tcs.Token);
        var hasCorrectAmountOfItems = (response.items.Count <= 10) && (response.items.Count > 0);

        // Assert
        Assert.True(hasCorrectAmountOfItems);
    }
}