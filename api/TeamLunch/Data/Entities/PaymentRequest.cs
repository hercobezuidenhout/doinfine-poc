using TeamLunch.Enums;

namespace TeamLunch.Data.Entities;

public class PaymentRequest
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public int TeamId { get; set; }
    public RequestStatus? Status { get; set; }
    public int? PaymentId { get; set; }
    public DateTime DateOfPayment { get; set; }
    public string Action { get; set; }
    public List<PaymentRequestResponse> Responses { get; set; }
}