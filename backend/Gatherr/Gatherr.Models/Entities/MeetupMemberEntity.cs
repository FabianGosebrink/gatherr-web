using System;

namespace Gatherr.Models.Entities
{
    public class MeetupMemberEntity
    {
        public Guid MeetupId { get; set; }
        public MeetupEntity Meetup { get; set; }

        public Guid UserProfileId { get; set; }
        public UserProfileEntity UserProfile { get; set; }

        public MeetupRole Role { get; set; }
        public DateTime Modified { get; set; }
    }
}
