namespace Webet333.models.Request.Game
{
    public class M8UsersSetBettingLimitsRequest : BaseAdminLogRequest
    {
        public bool SetLimit { get; set; }

        public string Id { get; set; }
    }
}