using Gatherr.Data.Context;
using Gatherr.Models.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gatherr.Data.Services
{
    public class SeedDataService : ISeedDataService
    {
        public async Task Initialize(GatherrDbContext context)
        {
            context.Database.EnsureCreated();
            if (context.Groups.Any())
            {
                return;
            }

            var allCategories = new List<CategoryEntity>()
                {
                    new CategoryEntity() { Name = "Technology" },
                    new CategoryEntity() { Name = "Business" },
                    new CategoryEntity() { Name = "Design" },
                    new CategoryEntity() { Name = "Education" },
                    new CategoryEntity() { Name = "DIY" },
                    new CategoryEntity() { Name = "Programming" },
                    new CategoryEntity() { Name = "Research" },
                    new CategoryEntity() { Name = "Science" },
                };

            context.Categories.AddRange(allCategories);

            await context.SaveChangesAsync();
        }
    }
}
