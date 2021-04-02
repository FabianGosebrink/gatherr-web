using Gatherr.Models.Entities;
using System;

namespace Gatherr.Models.Dtos.Member
{
    public class GroupMemberUpdateDto
    {
        public Guid MemberId { get; set; }
        public GroupRole Role { get; set; }
    }
}
