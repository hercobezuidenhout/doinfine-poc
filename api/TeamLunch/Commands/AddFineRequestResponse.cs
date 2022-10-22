using MauticNetClient;
using MauticNetClient.Commands.Emails;
using MauticNetClient.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Contracts;
using TeamLunch.Data;
using TeamLunch.Data.Entities;
using TeamLunch.Exceptions;
using TeamLunch.Models;

namespace TeamLunch.Commands;

public static class AddFineRequestResponse
{
    public record Command(int requestId, string userId, bool response) : IRequest<Response>;

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
            var userHasResponded = _db.FineRequestResponses.Where(x => x.FineRequestId == request.requestId && x.UserId == request.userId).Any();

            if (userHasResponded) throw new FineRequestNotFoundException("User has already responded this request.");

            var fineRequestResponse = new FineRequestResponse
            {
                FineRequestId = request.requestId,
                UserId = request.userId,
                Approved = request.response
            };

            _db.FineRequestResponses.Add(fineRequestResponse);

            var fineRequest = _db.FineRequests.Where(x => x.Id == request.requestId).Include(x => x.Responses).First();
            var team = _db.Teams.Where(x => x.Id == fineRequest.TeamId).Include(x => x.Users).First();
            var hasAllResponses = fineRequest.Responses.Count() >= team.Users.Count() - 1;
            var isApproved = fineRequest.Responses.Where(x => x.Approved).Count() > fineRequest.Responses.Where(x => !x.Approved).Count();
            var userBeingFined = team.Users.Where(x => x.Id == fineRequest.Finee).Select(x => $"{x.FirstName} {x.LastName}").First();

            if (hasAllResponses)
            {
                if (isApproved)
                {
                    var fine = new Fine
                    {
                        UserId = fineRequest.Finee,
                        Reason = fineRequest.Reason
                    };

                    _db.Fines.Add(fine);
                    _db.SaveChanges();

                    _notificationService.SendNotificationToTeam(new NotificationItem
                    {
                        Title = $"{userBeingFined} has been fined!",
                        Description = $"{userBeingFined} has been for {fine.Reason}."
                    }, team);

                    var segmentEmail = new SegmentEmail<int>
                    {
                        Name = $"Fine Request Approved {fineRequest.Id}",
                        Subject = $"{userBeingFined} has been fined!",
                        IsPublished = true,
                        CustomHtml = @$"
                            <!DOCTYPE html>
                                <html lang='en'>
                                <head>
                                    <meta charset='UTF-8' />
                                    <meta name='viewport' content='width=device-width' />
                                </head>
                                <body>
                                    <div>
                                    <p>
                                        {userBeingFined} has been fined for {fine.Reason}.
                                    </p>
                                    </div>
                                </body>
                                </html>

                        ",
                        Lists = new List<int> { team.SegmentId.GetValueOrDefault() }
                    };

                    var createSegmentEmailRequest = new CreateSegmentEmail.Request(segmentEmail);
                    var createEmailResponse = await _mauticClient.MakeRequest<CreateSegmentEmail.Request, CreateSegmentEmail.Response>(createSegmentEmailRequest);
                    var sendEmailResponse = await _mauticClient.MakeRequest<SendEmailToSegment.Request, SendEmailToSegment.Response>(new SendEmailToSegment.Request(createEmailResponse.email.Id));

                    return new Response(fineRequestResponse.Id, fine.Id);
                }
                else
                {
                    _notificationService.SendNotificationToTeam(new NotificationItem
                    {
                        Title = $"The fine for {userBeingFined} has been rejected!",
                        Description = $"{userBeingFined} has not been fined for {fineRequest.Reason}."
                    }, team);

                    var segmentEmail = new SegmentEmail<int>
                    {
                        Name = $"Fine Request Rejected {fineRequest.Id}",
                        Subject = $"The fine for {userBeingFined} has been rejected!",
                        IsPublished = true,
                        CustomHtml = @$"
                            <!DOCTYPE html>
                                <html lang='en'>
                                <head>
                                    <meta charset='UTF-8' />
                                    <meta name='viewport' content='width=device-width' />
                                </head>
                                <body>
                                    <div>
                                    <p>
                                        {userBeingFined} has not been fined for {fineRequest.Reason}.
                                    </p>
                                    </div>
                                </body>
                                </html>

                        ",
                        Lists = new List<int> { team.SegmentId.GetValueOrDefault() }
                    };

                    var createSegmentEmailRequest = new CreateSegmentEmail.Request(segmentEmail);
                    var createEmailResponse = await _mauticClient.MakeRequest<CreateSegmentEmail.Request, CreateSegmentEmail.Response>(createSegmentEmailRequest);
                    var sendEmailResponse = await _mauticClient.MakeRequest<SendEmailToSegment.Request, SendEmailToSegment.Response>(new SendEmailToSegment.Request(createEmailResponse.email.Id));

                }
            }

            _db.SaveChanges();
            return new Response(fineRequestResponse.Id);
        }
    }

    public record Response(int id, int? fineId = null);
}