namespace Webet333.models.Response.Game.SA
{
    public class SADepositWithdrawResponse : SARegisterResponse
    {
        public decimal Amount { get; set; }

        public decimal Balance { get; set; }

        public string OrderId { get; set; }
    }
}