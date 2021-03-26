namespace Webet333.models.Response.Promotions
{
    public class PromotionReport
    {
        public string Title { get; set; }

        public decimal DepositPromotionCount { get; set; }

        public decimal DepositPromotionCountPercentage { get; set; }

        public decimal WithdrawPromotionCount { get; set; }

        public decimal WithdrawPromotionCountPercentage { get; set; }

        public decimal TotalDepositAmount { get; set; }

        public decimal BonusIssue { get; set; }

        public decimal TotalWithdrawAmount { get; set; }

        public decimal WinLose { get; set; }
    }

    public class PromotionTotalReports
    {
        public decimal? TotalDepositAmount { get; set; }

        public decimal? TotalWithdrawAmount { get; set; }

        public decimal? TotalIssueBonus { get; set; }

        public decimal? WinLose { get; set; }

        public decimal? NewUserTotalDeposit { get; set; }

        public decimal? NewUserTotalWithdraw { get; set; }

        public decimal? OldUserTotalDeposit { get; set; }

        public decimal? OldUserTotalWithdraw { get; set; }

        public decimal? TotalUniqueUserDeposit { get; set; }

        public decimal? TotalUniqueUserWithdraw { get; set; }

        public decimal? NewUserCount { get; set; }

        public decimal? OldUserCount { get; set; }
    }
}