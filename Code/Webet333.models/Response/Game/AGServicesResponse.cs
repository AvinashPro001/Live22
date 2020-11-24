using System.Collections.Generic;

namespace Webet333.models.Response.Game
{
    public class Details
    {
        public string shoeCode { get; set; }
        public string bankerPoint { get; set; }
        public string playerPoint { get; set; }
        public string cardNum { get; set; }
        public string pair { get; set; }
        public string dragonPoint { get; set; }
        public string tigerPoint { get; set; }
        public string cardList { get; set; }
        public string vid { get; set; }
    }

    public class Tran
    {
        public int id { get; set; }
        public string user_id { get; set; }
        public string operator_id { get; set; }
        public string transaction_time { get; set; }
        public string trans_id { get; set; }
        public double winlost_amount { get; set; }
        public string game_code { get; set; }
        public string game_type { get; set; }
        public string stake { get; set; }
        public string valid_stake { get; set; }
        public int play_type { get; set; }
        public string platform_type { get; set; }
        public string currency { get; set; }
        public string table_code { get; set; }
        public string ip { get; set; }
        public string recaculate_time { get; set; }
        public string remark { get; set; }
        public int status { get; set; }
        public string jackpotcomm { get; set; }
        public string jackpotwin { get; set; }
        public string round { get; set; }
        public Details details { get; set; }
    }

    public class AGServicesResponse
    {
        public string error_code { get; set; }
        public string message { get; set; }
        public int total { get; set; }
        public int page { get; set; }
        public List<Tran> trans { get; set; }
    }

    public class MappingAGServices : Details
    {
        public int id { get; set; }
        public string user_id { get; set; }
        public string operator_id { get; set; }
        public string transaction_time { get; set; }
        public string trans_id { get; set; }
        public double winlost_amount { get; set; }
        public string game_code { get; set; }
        public string game_type { get; set; }
        public string stake { get; set; }
        public string valid_stake { get; set; }
        public int play_type { get; set; }
        public string platform_type { get; set; }
        public string currency { get; set; }
        public string table_code { get; set; }
        public string ip { get; set; }
        public string recaculate_time { get; set; }
        public string remark { get; set; }
        public int status { get; set; }
        public string jackpotcomm { get; set; }
        public string jackpotwin { get; set; }
        public string round { get; set; }
    }
}



