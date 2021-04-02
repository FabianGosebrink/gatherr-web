using AutoMapper;
using Gatherr.Data.Repositories;
using Gatherr.Models.Common;
using Gatherr.Models.Dtos.UserProfile;
using Gatherr.Models.Entities;
using System;

namespace Gatherr.Services.ControllerService
{
    public class UserProfileControllerService : IUserProfileControllerService
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IMapper _mapper;

        public UserProfileControllerService(IUserProfileRepository userProfileRepository, IMapper mapper)
        {
            _userProfileRepository = userProfileRepository;
            _mapper = mapper;
        }

        public ObjectDescriptor<UserProfileDto> GetUserProfile(Guid id)
        {
            var currentUserProfile = _userProfileRepository.GetSingle(id);

            if (currentUserProfile == null)
            {
                return null;
            }

            return new ObjectDescriptor<UserProfileDto>()
            {
                Value = _mapper.Map<UserProfileDto>(currentUserProfile),
            };
        }

        public ObjectDescriptor<UserProfileDto> GetUserProfile(string userIdentifier)
        {
            var currentUserProfile = _userProfileRepository.GetSingle(userIdentifier);

            if (currentUserProfile == null)
            {
                return null;
            }

            return new ObjectDescriptor<UserProfileDto>()
            {
                Value = _mapper.Map<UserProfileDto>(currentUserProfile),
            };
        }

        public ObjectDescriptor<UserProfileDto> AddUserProfile(UserProfileCreateDto userProfileUpdateDto)
        {
            UserProfileEntity currentUserProfile = _userProfileRepository.GetSingle(userProfileUpdateDto.UserIdentifier);

            if (currentUserProfile != null)
            {
                throw new Exception("UserProfile already exists");
            }

            var newEntity = _mapper.Map<UserProfileEntity>(userProfileUpdateDto);
            newEntity.UserIdentifier = userProfileUpdateDto.UserIdentifier;
            newEntity.Username = userProfileUpdateDto.Username;
            newEntity.ImageUrl = userProfileUpdateDto.ImageUrl;

            _userProfileRepository.Add(newEntity);

            if (!_userProfileRepository.Save())
            {
                throw new Exception("Updating an item failed on save.");
            }

            return new ObjectDescriptor<UserProfileDto>()
            {
                Value = _mapper.Map<UserProfileDto>(newEntity),
            };
        }

        public ObjectDescriptor<UserProfileDto> UpdateUserProfile(Guid id, UserProfileUpdateDto userProfileUpdateDto)
        {
            UserProfileEntity currentUserProfile = _userProfileRepository.GetSingle(id);

            if (currentUserProfile == null)
            {
                throw new Exception("UserProfile does not exist");
            }

            currentUserProfile.AboutMe = userProfileUpdateDto.AboutMe;
            currentUserProfile.Username = userProfileUpdateDto.Username;
            currentUserProfile.ImageUrl = String.IsNullOrEmpty(userProfileUpdateDto.ImageUrl) ? currentUserProfile.ImageUrl : userProfileUpdateDto.ImageUrl;

            _userProfileRepository.Update(currentUserProfile);

            if (!_userProfileRepository.Save())
            {
                throw new Exception("Updating an item failed on save.");
            }

            return new ObjectDescriptor<UserProfileDto>()
            {
                Value = _mapper.Map<UserProfileDto>(currentUserProfile),
            };
        }
    }
}
