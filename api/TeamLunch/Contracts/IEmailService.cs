namespace TeamLunch.Contracts;

public interface IEmailService
{
    void SendFineApprovedEmailToTeam(int requestId, string userBeingFined, string reason, long segmentId);
    void SendFineRejectedEmailToTeam(int requestId, string userBeingFined, string reason, long segmentId);
    void SendFineRequestEmailToTeam(int requestId, string userBeingFined, string reason, long segmentId);
    void SendPaymentApprovedEmailToTeam(int requestId, string userMakingPayment, string action, long segmentId);
    void SendPaymentRejectedEmailToTeam(int requestId, string userMakingPayment, string action, long segmentId);
    void SendPaymentRequestEmailToTeam(int requestId, string userMakingPayment, long segmentId);
}