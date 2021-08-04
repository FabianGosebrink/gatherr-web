using System;
using System.Collections.Generic;

namespace Gatherr.Models.Entities
{
    public class GroupEntity : IEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string LinkName { get; set; }
        public string ImageUrl { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public DateTime Created { get; set; }

        public List<GroupMemberEntity> GroupMembers { get; set; }
        public List<GatheringEntity> Gatherings { get; set; }
        public List<GroupCategoryEntity> GroupCategories { get; set; }
    }
}
