namespace Webet333.models.Configs
{
    public class AuthConfig
    {
        public string Key { get; set; }

        public string Issuer { get; set; }

        public string Audiance { get; set; }

        public int AccessExpireMinutes { get; set; }
    }
}