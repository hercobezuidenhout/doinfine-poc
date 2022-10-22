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

public static class NewFineRequest
{
    public class Command : IRequest<int>
    {
        public int TeamId { get; set; }
        public string UserId { get; set; }
        public string Finee { get; set; }
        public string Reason { get; set; }
    }

    public class Handler : IRequestHandler<Command, int>
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

        public async Task<int> Handle(Command request, CancellationToken cancellationToken)
        {

            var fineRequest = new FineRequest { TeamId = request.TeamId, Finer = request.UserId, Finee = request.Finee, Reason = request.Reason };

            _db.Add(fineRequest);
            _db.SaveChanges();

            var team = _db.Teams.Where(x => x.Id == request.TeamId).Include(x => x.Users).First();
            var userBeingFined = team.Users.Where(user => user.Id == request.Finee).Select(user => $"{user.FirstName} {user.LastName}").First();
            var notification = new NotificationItem
            {
                Title = "New fine has been submitted",
                Description = request.Reason,
                Link = "/fine-requests/" + fineRequest.Id
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
                Name = $"New Fine Request {fineRequest.Id}",
                Subject = "New fine has been submitted",
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
                                Someone wants to fine {userBeingFined} for {fineRequest.Reason}.
                            </p>
                            <a href='https://thankful-sand-0a1eb4203.1.azurestaticapps.net/fine-requests/{fineRequest.Id}'>
                                <button>View Fine Request</button>
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

            return fineRequest.Id;
        }
    }
}