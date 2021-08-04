using System;

namespace Gatherr.Models.Entities
{
    public class GatheringMemberEntity
    {
        public Guid MeetupId { get; set; }
        public GatheringEntity Meetup { get; set; }

        public Guid UserProfileId { get; set; }
        public UserProfileEntity UserProfile { get; set; }

        public GatheringRole Role { get; set; }
        public DateTime Modified { get; set; }
    }
}
