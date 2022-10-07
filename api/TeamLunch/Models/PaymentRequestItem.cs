namespace TeamLunch.Models;

public class PaymentRequestItem
{
    public int TeamId { get; set; }
    public string DateOfPayment { get; set; }
    public string Action { get; set; }
}