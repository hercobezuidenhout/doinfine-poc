
using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Contracts;
using TeamLunch.Data;
using TeamLunch.Data.Entities;
using TeamLunch.Models;
using TeamLunch.Services;

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
        private readonly IEmailService _emailService;

        public Handler(DataContext db, INotificationService notificationService, IEmailService emailService)
        {
            _db = db;
            _notificationService = notificationService;
            _emailService = emailService;
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

            _emailService.SendFineRequestEmailToTeam(fineRequest.Id, userBeingFined, fineRequest.Reason, team.SegmentId);
            _notificationService.SendNotificationToTeam(notification, team);

            return fineRequest.Id;
        }
    }
}