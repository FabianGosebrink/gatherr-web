using System;
using System.Collections.Generic;

namespace Gatherr.Models.Entities
{
    public class GatheringEntity : IEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime Date { get; set; }
        public int MaxAttendees { get; set; }
        public string LinkName { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ImageUrl { get; set; }
        public GatheringState State { get; set; }

        public Guid GroupId { get; set; }
        public GroupEntity Group { get; set; }
        public List<GatheringMemberEntity> Attendees { get; set; }
    }
}
