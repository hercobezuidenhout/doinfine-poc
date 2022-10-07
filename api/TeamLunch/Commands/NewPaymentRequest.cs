using MediatR;
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

        public Handler(DataContext db, INotificationService notificationService)
        {
            _db = db;
            _notificationService = notificationService;
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

            await _notificationService.SendNotification(new NotificationItem
            {
                Title = "New Payment Request",
                Description = "A new payment request has been submitted.",
                Link = $"/payment-requests/{paymentRequest.Id}"
            });

            return new Response(paymentRequest.Id);
        }
    }

    public record Response(int id);
}