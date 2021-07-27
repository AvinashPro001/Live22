using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Settings
{
    public class HomePageBannerAddResponse
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("idChinese")]
        public string IdChinese { get; set; }

        [JsonProperty("idEnglish")]
        public string IdEnglish { get; set; }

        [JsonProperty("idMalay")]
        public string IdMalay { get; set; }
    }
}