using MauticNetClient;
using MauticNetClient.Commands.Emails;
using MauticNetClient.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Contracts;
using TeamLunch.Data;
using TeamLunch.Data.Entities;
using TeamLunch.Models;

namespace TeamLunch.Commands;

public static class NewPaymentRequest
{
    public record Command(string userId, DateTime dateOfPayment, string action, int teamId) : IRequest<Response>;

    public class Handler : IRequestHandler<Command, Response>
    {
        private readonly DataContext _db;
        private readonly INotificationService _notificationService;
        private readonly MauticClient _mauticClient;

        public Handler(DataContext db, INotificationService notificationService, MauticClient mauticClient)
        {
            _db = db;
            _notificationService = notificationService;
            _mauticClient = mauticClient;
        }

        public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
        {
            var paymentRequest = new PaymentRequest
            {
                UserId = request.userId,
                TeamId = request.teamId,
                DateOfPayment = request.dateOfPayment,
                Action = request.action
            };

            _db.PaymentRequests.Add(paymentRequest);
            _db.SaveChanges();

            var team = _db.Teams.Include(team => team.Users).Where(x => x.Id == request.teamId).First();
            var userMakingPayment = team.Users.Where(user => user.Id == paymentRequest.UserId).Select(user => $"{user.FirstName} {user.LastName}").First();
            var notification = new NotificationItem
            {
                Title = "New Payment Request",
                Description = "A new payment request has been submitted.",
                Link = $"/payment-requests/{paymentRequest.Id}"
            };

            var style = @"
                button {
                    border: none;
                    border-radius: 3px;
                    padding: 1rem 1.5rem;
                    background-color: #f44336;
                    color: white;
                    font-weight: bold;
                }
            ";

            var segmentEmail = new SegmentEmail<int>
            {
                Name = $"New Payment Request {paymentRequest.Id}",
                Subject = "New payment has been submitted",
                IsPublished = true,
                CustomHtml = @$"
                    <!DOCTYPE html>
                        <html lang='en'>
                        <head>
                            <meta charset='UTF-8' />
                            <meta name='viewport' content='width=device-width' />
                            <style>
                                {style}
                            </style>
                        </head>
                        <body>
                            <div>
                            <p>
                                {userMakingPayment} claims to have made a payment by {paymentRequest.Action}.
                            </p>
                            <a href='https://thankful-sand-0a1eb4203.1.azurestaticapps.net/payment-requests/{paymentRequest.Id}'>
                                <button>View Payment Request</button>
                            </a>
                            </div>
                        </body>
                        </html>

                ",
                Lists = new List<int> { team.SegmentId.GetValueOrDefault() }
            };

            var createSegmentEmailRequest = new CreateSegmentEmail.Request(segmentEmail);
            var createEmailResponse = await _mauticClient.MakeRequest<CreateSegmentEmail.Request, CreateSegmentEmail.Response>(createSegmentEmailRequest);
            var sendEmailResponse = await _mauticClient.MakeRequest<SendEmailToSegment.Request, SendEmailToSegment.Response>(new SendEmailToSegment.Request(createEmailResponse.email.Id));

            _notificationService.SendNotificationToTeam(notification, team);

            return new Response(paymentRequest.Id);
        }
    }

    public record Response(int id);
}