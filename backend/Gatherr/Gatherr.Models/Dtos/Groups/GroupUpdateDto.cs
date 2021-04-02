using System;
using System.Collections.Generic;
namespace Gatherr.Models.Dtos.Groups
{
    public class GroupUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<Guid> CategoryIds { get; set; }
    }
}
