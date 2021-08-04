using Gatherr.Models.Entities;
using System;

namespace Gatherr.Models.Dtos.Member
{
    public class GatheringMemberUpdateDto
    {
        public Guid MemberId { get; set; }
        public GatheringRole Role { get; set; }
    }
}
