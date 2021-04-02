using AutoMapper;
using Gatherr.Models.Dtos.Member;
using Gatherr.Models.Entities;

namespace Gatherr.Services.Mappings
{
    public class GroupMemberMapping : Profile
    {
        public GroupMemberMapping()
        {
            CreateMap<GroupMemberEntity, GroupMemberDto>()
                .ForMember(dest => dest.MemberId, o => o.MapFrom(src => src.UserProfileId))
               .ForMember(dest => dest.UserProfile, o => o.MapFrom(src => src.UserProfile))
               .ForMember(dest => dest.Role, o => o.MapFrom(src => src.Role)
               ).ReverseMap();
        }
    }
}
