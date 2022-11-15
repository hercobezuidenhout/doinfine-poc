using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Contracts;
using TeamLunch.Data;
using TeamLunch.Data.Entities;
using TeamLunch.Exceptions;
using TeamLunch.Models;
using TeamLunch.Services;

namespace TeamLunch.Commands;

public static class AddFineRequestResponse
{
    public record Command(int requestId, string userId, bool response) : IRequest<Response>;

    public class Handler : IRequestHandler<Command, Response>
    {
        private readonly DataContext _db;
        private readonly INotificationService _notificationService;
        private readonly EmailService _emailService;

        public Handler(DataContext db, INotificationService notificationService, EmailService emailService)
        {
            _db = db;
            _notificationService = notificationService;
            _emailService = emailService;
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

                    _emailService.SendFineApprovedEmailToTeam(fineRequest.Id, userBeingFined, fineRequest.Reason, team.SegmentId);

                    return new Response(fineRequestResponse.Id, fine.Id);
                }
                else
                {
                    _notificationService.SendNotificationToTeam(new NotificationItem
                    {
                        Title = $"The fine for {userBeingFined} has been rejected!",
                        Description = $"{userBeingFined} has not been fined for {fineRequest.Reason}."
                    }, team);

                    _emailService.SendFineRejectedEmailToTeam(fineRequest.Id, userBeingFined, fineRequest.Reason, team.SegmentId);
                }
            }

            _db.SaveChanges();
            return new Response(fineRequestResponse.Id);
        }
    }

    public record Response(int id, int? fineId = null);
}