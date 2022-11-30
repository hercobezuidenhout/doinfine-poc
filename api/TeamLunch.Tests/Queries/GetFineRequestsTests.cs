using System.Threading;
using System.Threading.Tasks;
using NUnit.Framework;
using TeamLunch.Queries;

namespace TeamLunch.Tests.Queries;

[TestFixture]
public class GetFineRequestsTests : TestDataContextBase
{
    [SetUp]
    public void SetUp()
    {
        _stubContext = CreateContext();
    }

    [Test]
    public async Task Handler_GivenLoggedInUser_ReturnsRequestsWhichUserHasNotRespondedTo()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetActiveFineRequests.Handler(_stubContext);
        var response = await mockQuery.Handle(new GetActiveFineRequests.Query(Constants.EXAMPLE_USER_ID, Constants.EXAMPLE_TEAM_ID), tcs.Token);

        // Assert
        var hasCorrectAmountOfItems = response.Count == 4;
        Assert.True(hasCorrectAmountOfItems);
    }
}