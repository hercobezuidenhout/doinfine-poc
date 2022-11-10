using MediatR;

namespace MauticNetClient.Commands.Emails;

public static class SendEmailToSegment
{
    public record Request(int emailId) : IRequest<Response>;

    public class Handler : IRequestHandler<Request, Response>
    {
        private readonly MauticClient _mauticClient;

        public Handler(MauticClient mauticClient)
        {
            _mauticClient = mauticClient;
        }

        public Task<Response> Handle(Request request, CancellationToken cancellationToken)
        {
            var endpoint = $"emails/{request.emailId}/send";
            return _mauticClient.PostAsync<Request, Response>(request, endpoint);
        }
    }

    public record Response(int success, int sentCount, int failedRecipients);
}