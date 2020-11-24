namespace Webet333.models.Configs
{
    public class PushConfig
    {
        public Android Android { get; set; }

        public Apple Apple { get; set; }
    }

    public class Android
    {
        public string HostName { get; set; }

        public string ApplicationId { get; set; }

        public string SenderId { get; set; }
    }

    public class Apple
    {
        public string CertificatePath { get; set; }

        public string Password { get; set; }

        public string HostName { get; set; }
    }
}