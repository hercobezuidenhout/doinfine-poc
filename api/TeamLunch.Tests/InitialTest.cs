using TeamLunch.Services;
using NUnit.Framework;

namespace TeamLunch.Tests;

[TestFixture]
public class InitialTest
{
    private InitialService initialService;

    [SetUp]
    public void Setup()
    {
        initialService = new InitialService();
    }

    [Test]
    public void IsPrime_GivenOne_ShouldReturnFalse()
    {
        var result = initialService.IsPrime(1);
        Assert.IsFalse(result, "1 should not be prime");
    }
}