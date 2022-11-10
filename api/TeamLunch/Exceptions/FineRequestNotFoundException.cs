namespace TeamLunch.Exceptions;

public class FineRequestNotFoundException : Exception
{
    public FineRequestNotFoundException() { }

    public FineRequestNotFoundException(string message) : base(message) { }
    public FineRequestNotFoundException(string message, Exception inner) : base(message, inner) { }
}