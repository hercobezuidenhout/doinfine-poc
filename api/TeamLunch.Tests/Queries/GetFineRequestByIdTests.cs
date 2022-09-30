using System.Threading;
using System.Threading.Tasks;
using NUnit.Framework;
using TeamLunch.Exceptions;
using TeamLunch.Queries;

namespace TeamLunch.Tests.Queries;

[TestFixture]
public class GetFineRequestByIdTests : TestDataContextBase
{
    [SetUp]
    public void SetUp()
    {
        _stubContext = CreateContext();
    }

    [Test]
    public async Task Handler_GivenValidId_ReturnsRequest()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetFineRequestById.Handler(_stubContext);
        var response = await mockQuery.Handle(new GetFineRequestById.Query(2), tcs.Token);

        // Assert
        Assert.AreEqual("not caring enough about dogs", response.reason);
    }

    [Test]
    public async Task Handler_GivenInvalidId_ReturnsNotFound()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);


        // Act
        var mockQuery = new GetFineRequestById.Handler(_stubContext);

        // Assert
        Assert.ThrowsAsync<FineRequestNotFoundException>(async delegate
        {
            await mockQuery.Handle(new GetFineRequestById.Query(0), tcs.Token);
        });
    }

    [Test]
    public async Task Handler_GivenIdWithResponse_ReturnsNotFound()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetFineRequestById.Handler(_stubContext);

        // Assert
        Assert.ThrowsAsync<FineRequestNotFoundException>(async delegate
        {
            await mockQuery.Handle(new GetFineRequestById.Query(6), tcs.Token);
        });
    }
}