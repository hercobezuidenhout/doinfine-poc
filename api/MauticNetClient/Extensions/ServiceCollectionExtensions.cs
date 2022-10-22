using System.Net.Http.Headers;
using System.Reflection;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace MauticNetClient.Extensions;

public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Registers the MauticClient and all services needed for the package to work. 
    /// </summary>
    /// <param name="services">IServiceCollection services</param>
    /// <param name="baseAddress">The address of the Mautic instance for example https://mautic.example.com/api.</param>
    public static void AddMauticNetClient(this IServiceCollection services, string baseAddress)
    {
        var usernameAndPasssword = System.Text.Encoding.UTF8.GetBytes("herco:#Thinwbxj18*");
        services.AddScoped<MauticClient>();
        services.AddMediatR(Assembly.GetExecutingAssembly());

        services.AddHttpClient<MauticClient>(x =>
        {
            x.BaseAddress = new Uri(baseAddress);
            x.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(usernameAndPasssword));
        });
    }
}