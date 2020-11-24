namespace Webet333.models.Response.Game.Mega888
{

    public class Result
    {
        public string loginId { get; set; }
        public bool success { get; set; }
        public string nickname { get; set; }
        public int userId { get; set; }
        public string regType { get; set; }
    }

    public class Mega888ApiRegisterResponse
    {
        public object id { get; set; }
        public Result result { get; set; }
        public object error { get; set; }
        public string jsonrpc { get; set; }
    }
}
