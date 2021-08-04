using AutoMapper;
using Gatherr.Models.Dtos.Member;
using Gatherr.Models.Entities;

namespace Gatherr.Services.Mappings
{
    public class GatheringMemberMapping : Profile
    {
        public GatheringMemberMapping()
        {
            CreateMap<GatheringMemberEntity, GatheringMemberDto>()
               .ForMember(dest => dest.MemberId, o => o.MapFrom(src => src.UserProfileId))
              .ForMember(dest => dest.UserProfile, o => o.MapFrom(src => src.UserProfile))
              .ForMember(dest => dest.GatheringId, o => o.MapFrom(src => src.GatheringId))
              .ForMember(dest => dest.Role, o => o.MapFrom(src => src.Role)
              ).ReverseMap();
        }
    }
}
