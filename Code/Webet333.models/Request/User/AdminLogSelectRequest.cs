using System;

namespace Webet333.models.Request.User
{
    public class AdminLogSelectRequest : SearchParamRequest
    {
        public Guid? AdminId { get; set; }

        public Guid? UserId { get; set; }

        public Guid? ActionId { get; set; }

        public Guid? ModuleId { get; set; }
    }
}