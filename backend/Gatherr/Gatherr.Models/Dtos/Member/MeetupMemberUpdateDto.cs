using Gatherr.Models.Entities;
using System;

namespace Gatherr.Models.Dtos.Member
{
    public class MeetupMemberUpdateDto
    {
        public Guid MemberId { get; set; }
        public MeetupRole Role { get; set; }
    }
}
