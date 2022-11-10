using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using MediatR;

namespace MauticNetClient;
public class MauticClient
{
    private readonly HttpClient _httpClient;
    private readonly IMediator _mediator;

    public MauticClient(HttpClient httpClient, IMediator mediator)
    {
        _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        _mediator = mediator;
    }

    /// <summary>
    /// Makes a GET request to the specified endpoint.
    /// </summary>
    /// <param name="endpoint">Endpoint for request</param>
    /// <returns></returns>
    internal async Task<TResponse> GetAsync<TResponse>(string endpoint)
    {
        using (var result = await _httpClient.GetAsync(endpoint))
        {
            using (var contentStream = await result.Content.ReadAsStreamAsync())
            {
                return JsonSerializer.Deserialize<TResponse>(contentStream);
            }
        }
    }

    /// <summary>
    /// Makes a POST request to the specified endpoint.
    /// </summary>
    /// <typeparam name="TRequest">Data type of the data.</typeparam>
    /// <typeparam name="TResponse">Data type of expected result.</typeparam>
    /// <param name="request">The data being passed through to the API.</param>
    /// <param name="endpoint">The endpoint of the request.</param>
    /// <returns></returns>
    internal async Task<TResponse> PostAsync<TRequest, TResponse>(TRequest request, string endpoint)
    {
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        };

        var requestJson = JsonSerializer.Serialize(request, options);
        var content = new StringContent(requestJson, Encoding.UTF8, "application/json");

        var result = await _httpClient.PostAsync(endpoint, content);
        var responseJson = await result.Content.ReadAsStringAsync();

        var response = JsonSerializer.Deserialize<TResponse>(responseJson, options);

        return response;
    }

    public async Task<TResponse> MakeRequest<TRequest, TResponse>(TRequest request) where TRequest : IRequest<TResponse>
    {
        return await _mediator.Send<TResponse>(request);
    }
}
