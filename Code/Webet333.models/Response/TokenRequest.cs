namespace Webet333.models.Response
{
    public class TokenRequest
    {
        public string userId { get; set; }

        public string purpose { get; set; }

        public string uniqueId { get; set; }

        public bool expired { get; set; }
    }
}
