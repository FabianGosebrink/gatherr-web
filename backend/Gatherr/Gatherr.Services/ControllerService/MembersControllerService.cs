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
        private readonly IGatheringRepository _gatheringRepository;
        private readonly IGatheringMemberRepository _gatheringMemberRepository;

        public MembersControllerService(
            IGroupsRepository repository,
            IMapper mapper,
            IGroupMemberRepository groupMemberRepository,
            IGatheringMemberRepository gatheringMemberRepository,
            IUserProfileRepository userProfileRepository,
            IGatheringRepository gatheringRepository)
        {

            _repository = repository;
            _mapper = mapper;
            _groupMemberRepository = groupMemberRepository;
            _gatheringMemberRepository = gatheringMemberRepository;
            _userProfileRepository = userProfileRepository;
            _gatheringRepository = gatheringRepository;
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

        public IObjectDescriptor<GatheringMemberDto> RemoveMemberFromGathering(string linkName, Guid gatheringId, Guid memberId)
        {
            GatheringEntity existingGathering = _gatheringRepository
                .GetSingle(predicate: x => x.Id == gatheringId && x.Group.LinkName == linkName,
                        include: source => source.Include(x => x.Group).Include(x => x.Attendees));

            if (existingGathering == null)
            {
                return null;
            }

            var existingMember = existingGathering.Attendees.FirstOrDefault(x => x.UserProfileId == memberId);

            if (existingMember == null)
            {
                return null;
            }

            existingGathering.Attendees.Remove(existingMember);

            GatheringMemberEntity nextGatheringMemberFromWaitingList = existingGathering.Attendees.Where(x => x.Role == GatheringRole.WaitingList).OrderBy(x => x.Modified).FirstOrDefault();

            if(nextGatheringMemberFromWaitingList != null)
            {
                nextGatheringMemberFromWaitingList.Role = GatheringRole.Attendee;
                _gatheringMemberRepository.Update(nextGatheringMemberFromWaitingList);
            }

            if (_gatheringRepository.Save() <= 0)
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

        public IObjectDescriptor<GatheringMemberDto> UpdateGatheringMember(string linkName, Guid gatheringId, GatheringMemberUpdateDto updateDto)
        {
            GatheringMemberEntity existingGatheringMember = _gatheringMemberRepository
                .GetSingle(predicate: x => x.GatheringId == gatheringId && x.Gathering.Group.LinkName == linkName && x.UserProfileId == updateDto.MemberId,
                include: source => source.Include(y => y.Gathering).ThenInclude(y => y.Group));

            if (existingGatheringMember == null)
            {
                return null;
            }

            existingGatheringMember.Role = updateDto.Role;

            _gatheringMemberRepository.Update(existingGatheringMember);

            if (_repository.Save() <= 0)
            {
                throw new Exception("Adding an item failed on save.");
            }
            return new ObjectDescriptor<GatheringMemberDto>()
            {
                Value = _mapper.Map<GatheringMemberDto>(existingGatheringMember)
            };
        }

        public IObjectDescriptor<List<GatheringMemberDto>> GetAllGatheringAttendees(string linkName, Guid gatheringId)
        {
            GatheringEntity existingGathering = _gatheringRepository
               .GetSingle(predicate: x => x.Id == gatheringId && x.Group.LinkName == linkName,
                       include: source => source.Include(x => x.Group).Include(x => x.Attendees).ThenInclude(x => x.UserProfile));

            if (existingGathering == null)
            {
                return null;
            }

            var memberDtos = _mapper.Map<List<GatheringMemberDto>>(existingGathering.Attendees);

            return new ObjectDescriptor<List<GatheringMemberDto>>()
            {
                Value = memberDtos,
            };
        }

        public IObjectDescriptor<GatheringMemberDto> AddCurrentUserAsGatheringMember(string linkName, Guid gatheringId, string username)
        {
            GatheringEntity existingGathering = _gatheringRepository
                .GetSingle(predicate: x => x.Id == gatheringId && x.Group.LinkName == linkName, include: source => source.Include(x => x.Attendees).ThenInclude(x => x.UserProfile));

            if (existingGathering == null)
            {
                return null;
            }

            var existingUserprofile = _userProfileRepository.GetSingle(username);

            if (existingUserprofile == null)
            {
                return null;
            }

            if (existingGathering.Attendees.Count() + 1 >= existingGathering.MaxAttendees)
            {
                _gatheringMemberRepository.Add(new GatheringMemberEntity() { UserProfileId = existingUserprofile.Id, Role = GatheringRole.WaitingList, GatheringId = gatheringId, Modified = DateTime.UtcNow });
            }
            else
            {
                _gatheringMemberRepository.Add(new GatheringMemberEntity() { UserProfileId = existingUserprofile.Id, Role = GatheringRole.Attendee, GatheringId = gatheringId, Modified = DateTime.UtcNow });
            }

            if (_repository.Save() <= 0)
            {
                throw new Exception("Adding an item failed on save.");
            }

            var addedMember = _gatheringMemberRepository.GetSingle(predicate: x => x.UserProfileId == existingUserprofile.Id && x.GatheringId == gatheringId,
                include: source => source.Include(x => x.UserProfile));

            return new ObjectDescriptor<GatheringMemberDto>()
            {
                Value = _mapper.Map<GatheringMemberDto>(addedMember)
            };
        }
    }
}
