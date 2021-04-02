using AutoMapper;
using Gatherr.Data.Repositories;
using Gatherr.Models.Common;
using Gatherr.Models.Dtos.Categories;
using System.Collections.Generic;

namespace Gatherr.Services.ControllerService
{
    public class CategoryControllerService : ICategoryControllerService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryControllerService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public ObjectDescriptor<List<CategoryDto>> GetAllCategories()
        {
            return new ObjectDescriptor<List<CategoryDto>>()
            {
                Value = _mapper.Map<List<CategoryDto>>(_categoryRepository.GetAllCategories()),
            };
        }
    }
}
