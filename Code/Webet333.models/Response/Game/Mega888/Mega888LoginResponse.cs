namespace Webet333.models.Response.Game.Mega888
{
    public class Results
    {
        public string success { get; set; }
        public string sessionId { get; set; }
        public string msg { get; set; }
    }

    public class Mega888LoginResponse
    {
        public string id { get; set; }
        public Results result { get; set; }
        public object error { get; set; }
        public string jsonrpc { get; set; }
    }
}
