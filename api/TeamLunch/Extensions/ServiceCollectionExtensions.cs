using sib_api_v3_sdk.Client;
using TeamLunch.Contracts;
using TeamLunch.Services;

namespace TeamLunch.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddEmailService(this IServiceCollection services)
    {
        Configuration.Default.ApiKey.Add("api-key", "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");
        services.AddScoped<IEmailService, EmailService>();
    }
}