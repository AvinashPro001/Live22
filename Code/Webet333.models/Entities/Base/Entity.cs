using System;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Entities.Base
{
    public class Entity
    {
        [Key]
        public Guid Id { get; set; }

        public DateTime Created { get; set; }

        public DateTime Modified { get; set; }

        public bool Active { get; set; }

        public bool Deleted { get; set; }

        public Entity()
        {
            Id = Guid.NewGuid();

            Created = DateTime.UtcNow;

            Modified = DateTime.UtcNow;

            Active = true;

            Deleted = false;
        }
    }
}