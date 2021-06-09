namespace Webet333.service.Model
{
    public class APIConst
    {
#if DEBUG
        public const string baseUrl = "http://uatapi.webet333.com/api/v1/";
#elif STAG
        public const string baseUrl = "http://api.webet333.com/api/v1/";
#endif

        public const string login = "account/login";

        public const string nonRegisterUsers = "Game/CheckAllGameRegister";

        public const string register918kiss = "Game/Register/918Kiss";

        public const string registerAG = "Game/Register/AG";

        public const string registerPlaytech = "Game/Register/Playtech";

        public const string registerJoker = "Game/Register/Joker";

        public const string registerM8 = "Game/Register/M8";

        public const string registerMaxBet = "http://uatapi.webet333.com/api/v1/";

        public const string registerMega888 = "http://uatapi.webet333.com/api/v1/";

        public const string registerYeeBet = "yeebet/register";
    }
}