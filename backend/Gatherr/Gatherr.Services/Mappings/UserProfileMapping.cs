using AutoMapper;
using Gatherr.Models.Dtos.UserProfile;
using Gatherr.Models.Entities;

namespace Gatherr.Services.Mappings
{
    public class UserProfileMapping : Profile
    {
        public UserProfileMapping()
        {
            CreateMap<UserProfileEntity, UserProfileDto>().ReverseMap();
            CreateMap<UserProfileEntity, UserProfileUpdateDto>().ReverseMap();
            CreateMap<UserProfileEntity, UserProfileCreateDto>().ReverseMap();
        }
    }
}
