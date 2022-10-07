namespace TeamLunch.Data.Entities;

public class Payment
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public string Action { get; set; }
    public DateTime DateOfPayment { get; set; }
}