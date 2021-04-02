using Gatherr.Models.Entities;
using System;

namespace Gatherr.Models.Dtos
{
    public class MeetupDto : DtoBase
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string LinkName { get; set; }
        public int MaxAttendees { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ImageUrl { get; set; }
        public DateTime Date { get; set; }
        public MeetupState State { get; set; }

        public DateTime Created { get; set; }
        public string GroupName { get; set; }
        public string GroupLinkName { get; set; }
        public Guid GroupId { get; set; }
    }
}
