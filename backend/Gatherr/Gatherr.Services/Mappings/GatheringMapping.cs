using AutoMapper;
using Gatherr.Models.Dtos;
using Gatherr.Models.Entities;

namespace Gatherr.Services.Mappings
{
    public class GatheringMapping : Profile
    {
        public GatheringMapping()
        {
            CreateMap<GatheringEntity, GatheringDto>()
                .ForMember(dest => dest.GroupId, o => o.MapFrom(src => src.Group.Id))
                .ForMember(dest => dest.GroupName, o => o.MapFrom(src => src.Group.Name))
                .ForMember(dest => dest.GroupLinkName, o => o.MapFrom(src => src.Group.LinkName))
                .ReverseMap();
            CreateMap<GatheringEntity, GatheringUpdateDto>().ReverseMap();
            CreateMap<GatheringEntity, GatheringCreateDto>().ReverseMap();
        }
    }
}
