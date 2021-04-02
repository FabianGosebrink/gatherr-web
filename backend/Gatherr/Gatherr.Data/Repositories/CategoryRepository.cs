using Gatherr.Data.Context;
using Gatherr.Models.Entities;
using System.Linq;

namespace Gatherr.Data.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly GatherrDbContext _context;

        public CategoryRepository(GatherrDbContext context)
        {
            _context = context;
        }

        public IQueryable<CategoryEntity> GetAllCategories()
        {
            return _context.Categories;
        }
    }
}
