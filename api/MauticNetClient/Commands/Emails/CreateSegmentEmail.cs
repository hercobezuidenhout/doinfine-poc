using MauticNetClient.Models;
using MediatR;

namespace MauticNetClient.Commands.Emails;

public static class CreateSegmentEmail
{
    public record Request(SegmentEmail<int> email) : IRequest<Response>;

    public class Handler : IRequestHandler<Request, Response>
    {
        private readonly MauticClient _client;

        public Handler(MauticClient client)
        {
            _client = client;
        }

        public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            return await _client.PostAsync<SegmentEmail<int>, Response>(request.email, "emails/new");
        }
    }

    public record Response(SegmentEmail<Segment> email);
}