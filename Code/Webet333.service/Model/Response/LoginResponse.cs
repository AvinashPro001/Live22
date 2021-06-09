namespace Webet333.service.Model
{
    public class LoginResponse
    {
        public string message { get; set; }

        public Data data { get; set; }
    }

    public class Data
    {
        public string access_token { get; set; }
    }
}