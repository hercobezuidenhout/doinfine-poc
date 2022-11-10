namespace TeamLunch.Data.Entities;

public class PaymentRequestResponse
{
    public int Id { get; set; }
    public int PaymentRequestId { get; set; }
    public string UserId { get; set; }
    public bool Approved { get; set; }
}