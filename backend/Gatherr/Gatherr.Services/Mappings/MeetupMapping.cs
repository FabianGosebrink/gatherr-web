using AutoMapper;
using Gatherr.Models.Dtos;
using Gatherr.Models.Entities;

namespace Gatherr.Services.Mappings
{
    public class MeetupMapping : Profile
    {
        public MeetupMapping()
        {
            CreateMap<MeetupEntity, MeetupDto>()
                .ForMember(dest => dest.GroupId, o => o.MapFrom(src => src.Group.Id))
                .ForMember(dest => dest.GroupName, o => o.MapFrom(src => src.Group.Name))
                .ForMember(dest => dest.GroupLinkName, o => o.MapFrom(src => src.Group.LinkName))
                .ReverseMap();
            CreateMap<MeetupEntity, MeetupUpdateDto>().ReverseMap();
            CreateMap<MeetupEntity, MeetupCreateDto>().ReverseMap();
        }
    }
}
