using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Contracts;
using TeamLunch.Data;
using TeamLunch.Data.Entities;
using TeamLunch.Exceptions;
using TeamLunch.Models;

namespace TeamLunch.Commands;

public static class AddPaymentRequestResponse
{
    public record Command(int requestId, string userId, bool response) : IRequest<Response>;

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
            var userHasResponded = _db.PaymentRequestResponses.Where(x => x.PaymentRequestId == request.requestId && x.UserId == request.userId).Any();

            if (userHasResponded) throw new PaymentRequestNotFoundException("User has already responded this request.");

            var paymentRequestResponse = new PaymentRequestResponse
            {
                PaymentRequestId = request.requestId,
                UserId = request.userId,
                Approved = request.response
            };

            _db.PaymentRequestResponses.Add(paymentRequestResponse);

            var paymentRequest = _db.PaymentRequests.Where(x => x.Id == request.requestId).Include(x => x.Responses).First();
            var team = _db.Teams.Where(x => x.Id == paymentRequest.TeamId).Include(x => x.Users).First();
            var hasAllResponses = paymentRequest.Responses.Count() >= team.Users.Count() - 1;
            var isApproved = paymentRequest.Responses.Where(x => x.Approved).Count() > paymentRequest.Responses.Where(x => !x.Approved).Count();
            var userPaying = team.Users.Where(x => x.Id == paymentRequest.UserId).Select(x => $"{x.FirstName} {x.LastName}").First();

            if (hasAllResponses)
            {
                if (isApproved)
                {
                    var payment = new Payment
                    {
                        UserId = paymentRequest.UserId,
                        Action = paymentRequest.Action,
                        DateOfPayment = paymentRequest.DateOfPayment
                    };

                    _db.Payments.Add(payment);
                    var fine = _db.Fines.Where(f => f.UserId == payment.UserId && !f.Paid).Last();
                    fine.Paid = true;
                    _db.SaveChanges();


                    _notificationService.SendNotificationToTeam(new NotificationItem
                    {
                        Title = $"{userPaying} has paid off a fine!",
                        Description = $"{userPaying} has paid of a fine by {payment.Action}."
                    }, team);

                    return new Response(paymentRequestResponse.Id, payment.Id);
                }
                else
                {
                    _notificationService.SendNotificationToTeam(new NotificationItem
                    {
                        Title = $"The payment request by {userPaying} has been rejected!",
                        Description = $"{userPaying} has not been paid off any fines by {paymentRequest.Action}."
                    }, team);
                }
            }

            _db.SaveChanges();
            return new Response(paymentRequestResponse.Id);
        }
    }

    public record Response(int id, int? paymentId = null);
}