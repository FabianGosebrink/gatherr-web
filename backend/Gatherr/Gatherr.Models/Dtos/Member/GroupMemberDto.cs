using Gatherr.Models.Dtos.UserProfile;
using Gatherr.Models.Entities;
using System;

namespace Gatherr.Models.Dtos.Member
{
    public class GroupMemberDto
    {
        public Guid MemberId { get; set; }
        public GroupRole Role { get; set; }
        public UserProfileDto UserProfile { get; set; }
    }
}
