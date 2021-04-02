using AutoMapper;
using Gatherr.Models.Dtos.Groups;
using Gatherr.Models.Entities;

namespace Gatherr.Services.Mappings
{
    public class GroupMapping : Profile
    {
        public GroupMapping()
        {
            CreateMap<GroupEntity, GroupDto>().ReverseMap();
            CreateMap<GroupEntity, GroupUpdateDto>().ReverseMap();
            CreateMap<GroupEntity, GroupCreateDto>().ReverseMap();
        }
    }
}
