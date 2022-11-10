namespace MauticNetClient.Models;

public class Email : MauticBase
{
    public string Name { get; set; }
    public string Subject { get; set; }
    public string Language { get; set; }
    public string Category { get; set; }
    public string FromAddress { get; set; }
    public string FromName { get; set; }
    public string ReplyToAddress { get; set; }
    public string BccAddress { get; set; }
    public string CustomHtml { get; set; }
    public string PlainText { get; set; }
    public string Template { get; set; }
    public string EmailType { get; set; }
    public bool? PublishUp { get; set; }
    public bool? PublishDown { get; set; }
    public int ReadCount { get; set; }
    public int SentCount { get; set; }
    public int Revision { get; set; }
}