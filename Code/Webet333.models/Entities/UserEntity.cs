using System;
namespace Webet333.models.Entities
{
    public class UserEntity : Microsoft.AspNetCore.Identity.IdentityUser<Guid>
    {
        public string Name { get; set; }

        public bool Deleted { get; set; }

        public bool Active { get; set; }

        public DateTime Created { get; set; }

        public DateTime Modified { get; set; }

        public UserEntity()
        {
            Active = true;

            Deleted = false;

            Created = DateTime.UtcNow;

            Modified = DateTime.UtcNow;
        }
    }
}