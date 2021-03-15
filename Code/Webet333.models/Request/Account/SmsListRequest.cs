﻿using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Account
{
    public class SmsListRequest
    {
        [JsonProperty(PropertyName = "minute")]
        public long Minute { get; set; }
    }

    public class SmsSend
    {
        [JsonProperty(PropertyName = "username")]
        public string Username { get; set; }

        [Required]
        [JsonProperty(PropertyName = "mobileNo")]
        public string MobileNo { get; set; }

        [Required]
        [JsonProperty(PropertyName = "message")]
        public string Message { get; set; }
    }
}