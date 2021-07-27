using System;

namespace Webet333.models.Request.Settings
{
    public class HomePageBannerImagePersist : BaseAdminLogRequest
    {
        public Guid Id { get; set; }

        public Guid BannerIdEnglish { get; set; }
        public string ExtensionWebEnglish { get; set; } = string.Empty;
        public string ExtensionMobileEnglish { get; set; } = string.Empty;

        public Guid BannerIdChinese { get; set; }
        public string ExtensionWebChinese { get; set; } = string.Empty;
        public string ExtensionMobileChinese { get; set; } = string.Empty;

        public Guid BannerIdMalay { get; set; }
        public string ExtensionWebMalay { get; set; } = string.Empty;
        public string ExtensionMobileMalay { get; set; } = string.Empty;
    }
}