using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Contracts;
using TeamLunch.Data;
using TeamLunch.Data.Entities;
using TeamLunch.Models;
using TeamLunch.Services;

namespace TeamLunch.Commands;

public static class NewPaymentRequest
{
    public record Command(string userId, DateTime dateOfPayment, string action, int teamId) : IRequest<Response>;

    public class Handler : IRequestHandler<Command, Response>
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

            _emailService.SendPaymentRequestEmailToTeam(paymentRequest.Id, userMakingPayment, team.SegmentId);
            _notificationService.SendNotificationToTeam(notification, team);

            return new Response(paymentRequest.Id);
        }
    }

    public record Response(int id);
}