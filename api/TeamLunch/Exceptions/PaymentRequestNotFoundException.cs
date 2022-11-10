namespace TeamLunch.Exceptions;

public class PaymentRequestNotFoundException : Exception
{
    public PaymentRequestNotFoundException() { }

    public PaymentRequestNotFoundException(string message) : base(message) { }
    public PaymentRequestNotFoundException(string message, Exception inner) : base(message, inner) { }
}