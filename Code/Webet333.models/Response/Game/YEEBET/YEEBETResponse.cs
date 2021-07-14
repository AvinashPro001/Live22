namespace Webet333.models.Response.Game.YEEBET
{
    public class YEEBETResponse : YEEBETBasicResponse
    {
        public string openurl { get; set; }
    }

    public class YEEBETBasicResponse
    {
        public int result { get; set; }

        public string desc { get; set; }
    }

    public class YEEBETDepositWithdrawalResponse : YEEBETBasicResponse
    {
        public string orderno { get; set; }

        public double balance { get; set; }

        public string tradeno { get; set; }
    }
}