using System;
using System.Collections.Generic;

namespace Gatherr.Models.Entities
{
    public class CategoryEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<GroupCategoryEntity> GroupCategories { get; set; }
    }
}
