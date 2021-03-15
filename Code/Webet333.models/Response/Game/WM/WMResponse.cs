namespace Webet333.models.Response.Game.WM
{
    public class WMResponse
    {
        public int errorCode { get; set; }

        public string errorMessage { get; set; }

        public string result { get; set; }
    }

    public class TransferResult
    {
        public string yourOrderNum { get; set; }

        public string orderId { get; set; }

        public string cash { get; set; }
    }

    public class WMTransferbalanceResponse
    {
        public int errorCode { get; set; }

        public string errorMessage { get; set; }

        public TransferResult result { get; set; }
    }
}