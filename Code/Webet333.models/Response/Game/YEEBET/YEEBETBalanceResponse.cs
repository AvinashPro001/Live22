namespace Webet333.models.Response.Game.YEEBET
{
    public class YEEBETBalanceResponse : YEEBETBasicResponse
    {
        public decimal balance { get; set; }

        public bool isplaying { get; set; }

        public bool isonline { get; set; }
    }
}