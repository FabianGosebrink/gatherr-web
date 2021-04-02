using System;

namespace Gatherr.Models.Entities
{
    public class GroupMemberEntity
    {
        public Guid GroupId { get; set; }
        public GroupEntity Group { get; set; }

        public Guid UserProfileId { get; set; }
        public UserProfileEntity UserProfile { get; set; }

        public GroupRole Role { get; set; }
    }
}
