using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Model;
using TeamLunch.Contracts;

namespace TeamLunch.Services;

public class EmailService : IEmailService
{
    public void SendFineRequestEmailToTeam(int requestId, string userBeingFined, string reason, long segmentId)
    {
        var campaigns = new EmailCampaignsApi();

        var x = new CreateEmailCampaign(
                sender: new CreateEmailCampaignSender(email: "finemaster@doinfine.app"),
                subject: $"Someone wants to fine {userBeingFined}",
                name: $"New Fine Request ID {requestId}",
                recipients: new CreateEmailCampaignRecipients { ListIds = new List<long?> { segmentId } },
                templateId: 3,
                _params: new Dictionary<string, string>
                {
                    { "user", userBeingFined },
                    { "reason",  reason },
                    { "requestId", requestId.ToString() }
                }
            );

        CreateModel createCampaignResult = campaigns.CreateEmailCampaign(x);
        campaigns.SendEmailCampaignNow(createCampaignResult.Id);
    }

    public void SendPaymentRequestEmailToTeam(int requestId, string userMakingPayment, long segmentId)
    {
        var campaigns = new EmailCampaignsApi();

        var x = new CreateEmailCampaign(
                sender: new CreateEmailCampaignSender(email: "finemaster@doinfine.app"),
                subject: $"{userMakingPayment} claims to have made a payment",
                name: $"New Payment Request ID {requestId}",
                recipients: new CreateEmailCampaignRecipients { ListIds = new List<long?> { segmentId } },
                templateId: 6,
                _params: new Dictionary<string, string>
                {
                    { "user", userMakingPayment },
                    { "requestId", requestId.ToString() }
                }
            );

        CreateModel createCampaignResult = campaigns.CreateEmailCampaign(x);
        campaigns.SendEmailCampaignNow(createCampaignResult.Id);
    }

    public void SendFineApprovedEmailToTeam(int requestId, string userBeingFined, string reason, long segmentId)
    {
        var campaigns = new EmailCampaignsApi();

        var x = new CreateEmailCampaign(
                sender: new CreateEmailCampaignSender(email: "finemaster@doinfine.app"),
                subject: $"{userBeingFined} has been fined!",
                name: $"Fine Request Approved ID {requestId}",
                recipients: new CreateEmailCampaignRecipients { ListIds = new List<long?> { segmentId } },
                templateId: 8,
                _params: new Dictionary<string, string>
                {
                    { "user", userBeingFined },
                    { "reason",  reason },
                    { "requestId", requestId.ToString() }
                }
            );

        CreateModel createCampaignResult = campaigns.CreateEmailCampaign(x);
        campaigns.SendEmailCampaignNow(createCampaignResult.Id);
    }

    public void SendFineRejectedEmailToTeam(int requestId, string userBeingFined, string reason, long segmentId)
    {
        var campaigns = new EmailCampaignsApi();

        var x = new CreateEmailCampaign(
                sender: new CreateEmailCampaignSender(email: "finemaster@doinfine.app"),
                subject: $"The fine request for {userBeingFined} has been rejected!",
                name: $"Fine Request Rejected ID {requestId}",
                recipients: new CreateEmailCampaignRecipients { ListIds = new List<long?> { segmentId } },
                templateId: 9,
                _params: new Dictionary<string, string>
                {
                    { "user", userBeingFined },
                    { "reason",  reason },
                    { "requestId", requestId.ToString() }
                }
            );

        CreateModel createCampaignResult = campaigns.CreateEmailCampaign(x);
        campaigns.SendEmailCampaignNow(createCampaignResult.Id);
    }

    public void SendPaymentApprovedEmailToTeam(int requestId, string userMakingPayment, string action, long segmentId)
    {
        var campaigns = new EmailCampaignsApi();

        var x = new CreateEmailCampaign(
                sender: new CreateEmailCampaignSender(email: "finemaster@doinfine.app"),
                subject: $"{userMakingPayment} has paid of fines!",
                name: $"Payment Request Approved ID {requestId}",
                recipients: new CreateEmailCampaignRecipients { ListIds = new List<long?> { segmentId } },
                templateId: 10,
                _params: new Dictionary<string, string>
                {
                    { "user", userMakingPayment },
                    { "action",  action },
                    { "requestId", requestId.ToString() }
                }
            );

        CreateModel createCampaignResult = campaigns.CreateEmailCampaign(x);
        campaigns.SendEmailCampaignNow(createCampaignResult.Id);
    }

    public void SendPaymentRejectedEmailToTeam(int requestId, string userMakingPayment, string action, long segmentId)
    {
        var campaigns = new EmailCampaignsApi();

        var x = new CreateEmailCampaign(
                sender: new CreateEmailCampaignSender(email: "finemaster@doinfine.app"),
                subject: $"Payment request for {userMakingPayment} has been rejected!",
                name: $"Payment Request Rejected ID {requestId}",
                recipients: new CreateEmailCampaignRecipients { ListIds = new List<long?> { segmentId } },
                templateId: 11,
                _params: new Dictionary<string, string>
                {
                    { "user", userMakingPayment },
                    { "action",  action },
                    { "requestId", requestId.ToString() }
                }
            );

        CreateModel createCampaignResult = campaigns.CreateEmailCampaign(x);
        campaigns.SendEmailCampaignNow(createCampaignResult.Id);
    }
}

