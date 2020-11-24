namespace Webet333.models.Configs
{
    public class EmailConfig
    {
        public string Domain { get; set; }

        public int Port { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string SenderName { get; set; }

        public string SenderEmail { get; set; }

        public bool EnableSSL { get; set; }
    }
}