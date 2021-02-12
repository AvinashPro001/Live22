using System;
using Webet333.models.Request.Base;

namespace Webet333.models.Request.User
{
    public class RetrieveByIdRequest : BaseValidateRequest
    {
        public Guid? Id { get; set; }

        public string Username { get; set; }
    }
}