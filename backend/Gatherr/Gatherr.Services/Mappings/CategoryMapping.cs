using AutoMapper;
using Gatherr.Models.Dtos.Categories;
using Gatherr.Models.Entities;

namespace Gatherr.Services.Mappings
{
    public class CategoryMapping : Profile
    {
        public CategoryMapping()
        {
            CreateMap<CategoryEntity, CategoryDto>()
                .ForMember(dest => dest.Id, o => o.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, o => o.MapFrom(src => src.Name))
                .ReverseMap();

            CreateMap<GroupCategoryEntity, CategoryDto>()
               .ForMember(dest => dest.Id, o => o.MapFrom(src => src.Category.Id))
               .ForMember(dest => dest.Name, o => o.MapFrom(src => src.Category.Name))
               .ReverseMap();
        }
    }
}
