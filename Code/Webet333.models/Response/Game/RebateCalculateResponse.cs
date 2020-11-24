namespace Webet333.models.Response.Game
{
    public class RebateCalculateResponse
    {
        public string Username { get; set; }
        public string APIUsername { get; set; }
        public string AnotherId { get; set; }
        public decimal Turnover { get; set; }
        public decimal Rolling { get; set; }
        public decimal Bet { get; set; }
        public decimal WinLose { get; set; }
        public decimal CommAmount { get; set; }
        public string GameName { get; set; }

        public string MobileNo { get; set; }
    }
}
