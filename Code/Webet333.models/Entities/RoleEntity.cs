using System;

namespace Webet333.models.Entities
{
    public class RoleEntity : Microsoft.AspNetCore.Identity.IdentityRole<Guid>
    {
        public bool Deleted { get; set; }

        public bool Active { get; set; }

        public DateTime Created { get; set; }

        public DateTime Modified { get; set; }

        public RoleEntity()
        {
            Active = true;
            Deleted = false;
            Created = DateTime.UtcNow;
            Modified = DateTime.UtcNow;
        }
    }
}