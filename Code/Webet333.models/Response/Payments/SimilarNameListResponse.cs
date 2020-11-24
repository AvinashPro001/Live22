namespace Webet333.models.Response.Payments
{
    public class SimilarNameListResponse
    {
        public string Name { get; set; }

        public string Username { get; set; }

        public string AccountName { get; set; }

        public decimal Amount { get; set; }

        public string SimilarPercentage { get; set; }
    }
}
