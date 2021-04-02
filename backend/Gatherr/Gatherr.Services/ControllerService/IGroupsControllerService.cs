using System;
using System.Collections.Generic;
using Gatherr.Models.Common;
using Gatherr.Models.Dtos.Groups;

namespace Gatherr.Services.ControllerService
{
    public interface IGroupsControllerService
    {
        IObjectDescriptor<GroupDto> Add(GroupCreateDto createDto, string username);
        IObjectDescriptor<List<GroupDto>> GetAll(GroupsQueryParameters queryParameters);
        IObjectDescriptor<List<GroupDto>> GetAllPersonalGroups(string currentUserName, GroupsQueryParameters queryParameters);
        IObjectDescriptor<GroupDto> GetGroupPerLinkName(string linkName);
        IObjectDescriptor<object> Remove(Guid id);
        IObjectDescriptor<GroupDto> Update(Guid groupId, GroupUpdateDto updateDto);
        IGroupsControllerService WithController(string controllerName);
    }
}