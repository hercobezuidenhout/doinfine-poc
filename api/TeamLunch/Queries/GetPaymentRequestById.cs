using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Data;
using TeamLunch.Enums;
using TeamLunch.Exceptions;

namespace TeamLunch.Queries;

public static class GetPaymentRequestById
{
    public record Query(int id, string userId) : IRequest<Response>;

    public class Handler : IRequestHandler<Query, Response>
    {
        private readonly DataContext _db;

        public Handler(DataContext db)
        {
            _db = db;
        }

        public async Task<Response?> Handle(Query request, CancellationToken cancellationToken)
        {
            try
            {
                var paymentRequest = _db.PaymentRequests
                    .Where(x => x.Id == request.id)
                    .Where(x => !x.Responses.Where(r => (r.PaymentRequestId == request.id) && (r.UserId == request.userId)).Any())
                    .Where(x => x.Status == RequestStatus.Pending)
                    .First();

                var userFullName = _db.Users.Where(x => x.Id == paymentRequest.UserId).Select(x => $"{x.FirstName} {x.LastName}").First();
                return new Response(paymentRequest.Id, userFullName, paymentRequest.Action, Convert.ToString(paymentRequest.DateOfPayment));
            }
            catch (InvalidOperationException exception)
            {
                throw new PaymentRequestNotFoundException($"Payment request not found with ID: {request.id}", exception);
            }
        }
    }

    public record Response(int id, string fullName, string action, string dateOfPayment);
}