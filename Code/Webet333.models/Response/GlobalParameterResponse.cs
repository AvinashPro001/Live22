using System;

namespace Webet333.models.Response
{
    public class GlobalParameterResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Value { get; set; }

    }

    public class AppDownloadLinkResponse : GlobalParameterResponse
    {
        public string BarcodeImage { get; set; }
        public string Comment { get; set; }
        
    }


    
}
