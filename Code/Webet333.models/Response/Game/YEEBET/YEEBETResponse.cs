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
}