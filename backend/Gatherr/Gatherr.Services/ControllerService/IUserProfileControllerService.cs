using Gatherr.Models.Common;
using Gatherr.Models.Dtos.UserProfile;
using System;

namespace Gatherr.Services.ControllerService
{
    public interface IUserProfileControllerService
    {
        ObjectDescriptor<UserProfileDto> AddUserProfile(UserProfileCreateDto userProfileUpdateDto);
        ObjectDescriptor<UserProfileDto> GetUserProfile(Guid id);
        ObjectDescriptor<UserProfileDto> GetUserProfile(string userIdentifier);
        ObjectDescriptor<UserProfileDto> UpdateUserProfile(Guid id, UserProfileUpdateDto userProfileUpdateDto);
    }
}