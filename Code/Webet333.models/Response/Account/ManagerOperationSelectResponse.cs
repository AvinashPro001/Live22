using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Account
{
    public class ManagerOperationSelectResponse
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string New { get; set; }
        public string Old { get; set; }
        public string OperationType { get; set; }
        public string IdentityProof { get; set; }
        public string Verified { get; set; }

        public DateTime Created { get; set; }
        public string ManagerUserName { get; set; }
        public long ManagerId { get; set; }
    }
}
