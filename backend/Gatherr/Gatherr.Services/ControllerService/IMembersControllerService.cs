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
        IObjectDescriptor<MeetupMemberDto> RemoveMemberFromMeetup(string linkName, Guid meetupId, Guid memberId);
        IObjectDescriptor<MeetupMemberDto> AddCurrentUserAsMeetupMember(string linkName, Guid meetupId, string username);
        IObjectDescriptor<MeetupMemberDto> UpdateMeetupMember(string linkName, Guid meetupId, MeetupMemberUpdateDto updateDto);
        IObjectDescriptor<List<MeetupMemberDto>> GetAllMeetupAttendees(string linkName, Guid meetupId);
    }
}
