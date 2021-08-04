using AutoMapper;
using Gatherr.Data.Repositories;
using Gatherr.Models.Common;
using Gatherr.Models.Dtos.Member;
using Gatherr.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Gatherr.Services.ControllerService
{
    public class MembersControllerService : IMembersControllerService
    {
        private readonly IGroupsRepository _repository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IMapper _mapper;
        private readonly IGroupMemberRepository _groupMemberRepository;
        private readonly IGatheringRepository _meetupRepository;
        private readonly IGatheringMemberRepository _meetupMemberRepository;

        public MembersControllerService(
            IGroupsRepository repository,
            IMapper mapper,
            IGroupMemberRepository groupMemberRepository,
            IGatheringMemberRepository meetupMemberRepository,
            IUserProfileRepository userProfileRepository,
            IGatheringRepository meetupRepository)
        {

            _repository = repository;
            _mapper = mapper;
            _groupMemberRepository = groupMemberRepository;
            _meetupMemberRepository = meetupMemberRepository;
            _userProfileRepository = userProfileRepository;
            _meetupRepository = meetupRepository;
        }

        public IObjectDescriptor<List<GroupMemberDto>> GetGroupMembers(string linkName)
        {
            IQueryable<GroupMemberEntity> allMembers = _groupMemberRepository
                .GetAll(predicate: x => x.Group.LinkName == linkName, include: source => source.Include(a => a.UserProfile));

            if (allMembers == null)
            {
                return null;
            }

            var memberDtos = _mapper.Map<List<GroupMemberDto>>(allMembers.ToList());

            return new ObjectDescriptor<List<GroupMemberDto>>()
            {
                Value = memberDtos,
            };
        }

        public IObjectDescriptor<List<GroupMemberDto>> AddCurrentUserAsGroupMember(string linkName, string name)
        {
            GroupEntity existingGroup = _repository.GetSingle(predicate: x => x.LinkName == linkName);

            if (existingGroup == null)
            {
                return null;
            }

            var existingUserprofile = _userProfileRepository.GetSingle(name);

            if (existingUserprofile == null)
            {
                return null;
            }

            _groupMemberRepository.Add(new GroupMemberEntity() { UserProfileId = existingUserprofile.Id, Role = GroupRole.Member, GroupId = existingGroup.Id });

            if (_repository.Save() <= 0)
            {
                throw new Exception("Adding an item failed on save.");
            }

            var allGroupMembers = _groupMemberRepository
                    .GetAll(predicate: x => x.GroupId == existingGroup.Id, 
                        include: source => source.Include(a => a.UserProfile));

            return new ObjectDescriptor<List<GroupMemberDto>>()
            {
                Value = _mapper.Map<List<GroupMemberDto>>(allGroupMembers)
            };
        }

        public IObjectDescriptor<GroupMemberDto> UpdateGroupMember(string linkName, GroupMemberUpdateDto updateDto)
        {
            GroupMemberEntity currentMember = _groupMemberRepository
                 .GetAll(predicate: x => x.Group.LinkName == linkName, include: source => source.Include(a => a.UserProfile))
                 .FirstOrDefault(x => x.UserProfileId == updateDto.MemberId);

            if (currentMember == null)
            {
                return null;
            }

            currentMember.Role = updateDto.Role;

            _groupMemberRepository.Update(currentMember);

            if (_repository.Save() <= 0)
            {
                throw new Exception("Adding an item failed on save.");
            }
            return new ObjectDescriptor<GroupMemberDto>()
            {
                Value = _mapper.Map<GroupMemberDto>(currentMember)
            };
        }

        public IObjectDescriptor<GatheringMemberDto> RemoveMemberFromGathering(string linkName, Guid meetupId, Guid memberId)
        {
            GatheringEntity existingMeetup = _meetupRepository
                .GetSingle(predicate: x => x.Id == meetupId && x.Group.LinkName == linkName,
                        include: source => source.Include(x => x.Group).Include(x => x.Attendees));

            if (existingMeetup == null)
            {
                return null;
            }

            var existingMember = existingMeetup.Attendees.FirstOrDefault(x => x.UserProfileId == memberId);

            if (existingMember == null)
            {
                return null;
            }

            existingMeetup.Attendees.Remove(existingMember);

            GatheringMemberEntity nextMeetupMemberFromWaitingList = existingMeetup.Attendees.Where(x => x.Role == GatheringRole.WaitingList).OrderBy(x => x.Modified).FirstOrDefault();

            if(nextMeetupMemberFromWaitingList != null)
            {
                nextMeetupMemberFromWaitingList.Role = GatheringRole.Attendee;
                _meetupMemberRepository.Update(nextMeetupMemberFromWaitingList);
            }

            if (_meetupRepository.Save() <= 0)
            {
                throw new Exception("Deleting an item failed on save.");
            }

            return new ObjectDescriptor<GatheringMemberDto>()
            {
                Value = _mapper.Map<GatheringMemberDto>(existingMember)
            };
        }


        public IObjectDescriptor<List<GroupMemberDto>> RemoveMemberFromGroup(string linkName, Guid id)
        {
            GroupEntity existingGroup = _repository.GetSingle(predicate: x => x.LinkName == linkName,
            include: source => source
                 .Include(y => y.GroupCategories).ThenInclude(y => y.Category)
                 .Include(y => y.GroupMembers)
                  .ThenInclude(y => y.UserProfile)
            );

            if (existingGroup == null)
            {
                return null;
            }

            var existingMember = existingGroup.GroupMembers.FirstOrDefault(x => x.UserProfileId == id);

            if (existingMember == null)
            {
                return null;
            }

            existingGroup.GroupMembers.Remove(existingMember);

            if (_repository.Save() <= 0)
            {
                throw new Exception("Deleting an item failed on save.");
            }

            var allGroupMembers = _groupMemberRepository
                   .GetAll(predicate: x => x.GroupId == existingGroup.Id,
                       include: source => source.Include(a => a.UserProfile));

            return new ObjectDescriptor<List<GroupMemberDto>>()
            {
                Value = _mapper.Map<List<GroupMemberDto>>(allGroupMembers)
            };
        }

        public IObjectDescriptor<GatheringMemberDto> UpdateGatheringMember(string linkName, Guid meetupId, GatheringMemberUpdateDto updateDto)
        {
            GatheringMemberEntity existingMeetupMember = _meetupMemberRepository
                .GetSingle(predicate: x => x.MeetupId == meetupId && x.Meetup.Group.LinkName == linkName && x.UserProfileId == updateDto.MemberId,
                include: source => source.Include(y => y.Meetup).ThenInclude(y => y.Group));

            if (existingMeetupMember == null)
            {
                return null;
            }

            existingMeetupMember.Role = updateDto.Role;

            _meetupMemberRepository.Update(existingMeetupMember);

            if (_repository.Save() <= 0)
            {
                throw new Exception("Adding an item failed on save.");
            }
            return new ObjectDescriptor<GatheringMemberDto>()
            {
                Value = _mapper.Map<GatheringMemberDto>(existingMeetupMember)
            };
        }

        public IObjectDescriptor<List<GatheringMemberDto>> GetAllGatheringAttendees(string linkName, Guid meetupId)
        {
            GatheringEntity existingMeetup = _meetupRepository
               .GetSingle(predicate: x => x.Id == meetupId && x.Group.LinkName == linkName,
                       include: source => source.Include(x => x.Group).Include(x => x.Attendees).ThenInclude(x => x.UserProfile));

            if (existingMeetup == null)
            {
                return null;
            }

            var memberDtos = _mapper.Map<List<GatheringMemberDto>>(existingMeetup.Attendees);

            return new ObjectDescriptor<List<GatheringMemberDto>>()
            {
                Value = memberDtos,
            };
        }

        public IObjectDescriptor<GatheringMemberDto> AddCurrentUserAsGatheringMember(string linkName, Guid meetupId, string username)
        {
            GatheringEntity existingMeetup = _meetupRepository
                .GetSingle(predicate: x => x.Id == meetupId && x.Group.LinkName == linkName, include: source => source.Include(x => x.Attendees).ThenInclude(x => x.UserProfile));

            if (existingMeetup == null)
            {
                return null;
            }

            var existingUserprofile = _userProfileRepository.GetSingle(username);

            if (existingUserprofile == null)
            {
                return null;
            }

            if (existingMeetup.Attendees.Count() + 1 >= existingMeetup.MaxAttendees)
            {
                _meetupMemberRepository.Add(new GatheringMemberEntity() { UserProfileId = existingUserprofile.Id, Role = GatheringRole.WaitingList, MeetupId = meetupId, Modified = DateTime.UtcNow });
            }
            else
            {
                _meetupMemberRepository.Add(new GatheringMemberEntity() { UserProfileId = existingUserprofile.Id, Role = GatheringRole.Attendee, MeetupId = meetupId, Modified = DateTime.UtcNow });
            }

            if (_repository.Save() <= 0)
            {
                throw new Exception("Adding an item failed on save.");
            }

            var addedMember = _meetupMemberRepository.GetSingle(predicate: x => x.UserProfileId == existingUserprofile.Id && x.MeetupId == meetupId,
                include: source => source.Include(x => x.UserProfile));

            return new ObjectDescriptor<GatheringMemberDto>()
            {
                Value = _mapper.Map<GatheringMemberDto>(addedMember)
            };
        }
    }
}
