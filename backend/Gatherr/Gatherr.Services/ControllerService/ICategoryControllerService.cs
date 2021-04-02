using System.Collections.Generic;
using Gatherr.Models.Common;
using Gatherr.Models.Dtos.Categories;

namespace Gatherr.Services.ControllerService
{
    public interface ICategoryControllerService
    {
        ObjectDescriptor<List<CategoryDto>> GetAllCategories();
    }
}