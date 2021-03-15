namespace Webet333.models.Request.Game
{
    public class GlobalVariableUpdateRequest : BaseAdminLogRequest
    {
        public string Name { get; set; }

        public string Value { get; set; }
    }
}