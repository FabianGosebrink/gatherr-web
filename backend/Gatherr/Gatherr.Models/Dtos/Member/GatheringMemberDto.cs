
using Gatherr.Models.Dtos.UserProfile;
using Gatherr.Models.Entities;
using System;

namespace Gatherr.Models.Dtos.Member
{
    public class GatheringMemberDto
    {
        public Guid MemberId { get; set; }
        public GatheringRole Role { get; set; }
        public UserProfileDto UserProfile { get; set; }
        public DateTime Modified { get; set; }

        public Guid MeetupId { get; set; }
    }
}
