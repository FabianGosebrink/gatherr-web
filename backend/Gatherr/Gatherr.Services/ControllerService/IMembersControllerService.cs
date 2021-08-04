using Gatherr.Models.Common;
using Gatherr.Models.Dtos.Member;
using System;
using System.Collections.Generic;

namespace Gatherr.Services.ControllerService
{
    public interface IMembersControllerService
    {
        IObjectDescriptor<List<GroupMemberDto>> AddCurrentUserAsGroupMember(string linkName, string name);
        IObjectDescriptor<List<GroupMemberDto>> RemoveMemberFromGroup(string linkName, Guid id);
        IObjectDescriptor<List<GroupMemberDto>> GetGroupMembers(string linkName);
        IObjectDescriptor<GroupMemberDto> UpdateGroupMember(string linkName, GroupMemberUpdateDto updateDto);
        IObjectDescriptor<GatheringMemberDto> RemoveMemberFromGathering(string linkName, Guid gatheringId, Guid memberId);
        IObjectDescriptor<GatheringMemberDto> AddCurrentUserAsGatheringMember(string linkName, Guid gatheringId, string username);
        IObjectDescriptor<GatheringMemberDto> UpdateGatheringMember(string linkName, Guid gatheringId, GatheringMemberUpdateDto updateDto);
        IObjectDescriptor<List<GatheringMemberDto>> GetAllGatheringAttendees(string linkName, Guid gatheringId);
    }
}
