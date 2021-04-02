using System.Linq;
using Gatherr.Models.Entities;

namespace Gatherr.Data.Repositories
{
    public interface ICategoryRepository
    {
        IQueryable<CategoryEntity> GetAllCategories();
    }
}