using System;

namespace Gatherr.Models.Entities
{
    public class GatheringMemberEntity
    {
        public Guid GatheringId { get; set; }
        public GatheringEntity Gathering { get; set; }

        public Guid UserProfileId { get; set; }
        public UserProfileEntity UserProfile { get; set; }

        public GatheringRole Role { get; set; }
        public DateTime Modified { get; set; }
    }
}
