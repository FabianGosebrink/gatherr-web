using System;
using System.Collections.Generic;

namespace Gatherr.Models.Entities
{
    public class UserProfileEntity
    {
        public Guid Id { get; set; }
        public string UserIdentifier { get; set; }
        public string Username { get; set; }
        public string AboutMe { get; set; }
        public string ImageUrl { get; set; }

        public List<GroupMemberEntity> Groups { get; set; }
        public List<GatheringMemberEntity> Meetups { get; set; }
    }
}
