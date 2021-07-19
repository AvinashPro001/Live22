using Newtonsoft.Json;

namespace Webet333.models.Response.Game.M8
{
    public class M8LoginResponse
    {
        [JsonProperty("?xml")]
        public LoginXml Xml { get; set; }

        [JsonProperty("response")]
        public LoginResponse Response { get; set; }
    }

    public class LoginXml
    {
        [JsonProperty("@version")]
        public string Version { get; set; }

        [JsonProperty("@encoding")]
        public string Encoding { get; set; }
    }

    public class Weburl
    {
        [JsonProperty("#cdata-section")]
        public string CdataSection { get; set; }
    }

    public class Weburlsecure
    {
        [JsonProperty("#cdata-section")]
        public string CdataSection { get; set; }
    }

    public class Mobiurl
    {
        [JsonProperty("#cdata-section")]
        public string CdataSection { get; set; }
    }

    public class Mobiurlsecure
    {
        [JsonProperty("#cdata-section")]
        public string CdataSection { get; set; }
    }

    public class Login
    {
        [JsonProperty("weburl")]
        public Weburl Weburl { get; set; }

        [JsonProperty("weburlsecure")]
        public Weburlsecure Weburlsecure { get; set; }

        [JsonProperty("mobiurl")]
        public Mobiurl Mobiurl { get; set; }

        [JsonProperty("mobiurlsecure")]
        public Mobiurlsecure Mobiurlsecure { get; set; }
    }

    public class Result
    {
        [JsonProperty("login")]
        public Login Login { get; set; }
    }

    public class LoginResponse
    {
        [JsonProperty("errcode")]
        public string Errcode { get; set; }

        [JsonProperty("errtext")]
        public string Errtext { get; set; }

        [JsonProperty("result")]
        public Result Result { get; set; }
    }


}
