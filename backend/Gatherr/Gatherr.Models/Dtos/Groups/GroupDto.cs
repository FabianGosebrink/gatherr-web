using Gatherr.Models.Dtos.Categories;
using System;
using System.Collections.Generic;

namespace Gatherr.Models.Dtos.Groups
{
    public class GroupDto : DtoBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public string Description { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string LinkName { get; set; }
        public string ImageUrl { get; set; }
        public List<CategoryDto> GroupCategories { get; set; }
    }
}
