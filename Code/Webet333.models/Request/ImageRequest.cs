using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request
{
    public class ImageRequest : GetByIdRequest
    {
        [Required]
        [JsonProperty(PropertyName = "file")]
        public string FormFile { get; set; }
    }


    public class PromotionImageRequest : ImageRequest
    {
        [Required]
        [JsonProperty(PropertyName = "mobilefile")]
        public string FormMobileFile { get; set; }
    }

    public class PromotionImageUpdateRequest : GetByIdRequestWithRequired
    {
        [JsonProperty(PropertyName = "file")]
        public string FormFile { get; set; }

        [JsonProperty(PropertyName = "mobilefile")]
        public string FormMobileFile { get; set; }
    }

    public class BankImagesIconInsertRequest: GetByIdRequest
    {
        [JsonProperty(PropertyName = "file")]
        public string FormFile { get; set; }

        [JsonProperty(PropertyName = "fileIcon")]
        public string FormIconFile { get; set; }
    }
}
