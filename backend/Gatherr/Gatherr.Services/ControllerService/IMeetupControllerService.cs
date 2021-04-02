using Gatherr.Models.Common;
using Gatherr.Models.Dtos;
using Gatherr.Models.Dtos.Meetups;
using System;
using System.Collections.Generic;

namespace Gatherr.Services.ControllerService
{
    public interface IMeetupControllerService
    {
        IObjectDescriptor<List<MeetupDto>> GetAllMeetupsFromGroup(string groupLinkName);
        IObjectDescriptor<List<MeetupDto>> GetAllPersonalMeetups(string username);
        IObjectDescriptor<MeetupDto> GetSingle(string groupLinkName, string meetupLinkName);
        IObjectDescriptor<object> Remove(Guid id);
        IObjectDescriptor<MeetupDto> Update(Guid id, MeetupUpdateDto updateDto);
        IMeetupControllerService WithController(string controllerName);
        IObjectDescriptor<MeetupDto> AddMeetupToGroup(string existingGroupId, MeetupCreateDto createDto, string currentUsername);
        IObjectDescriptor<List<MeetupDto>> GetMeetupsInArea(MeetupsFilterDto meetupLocationDto);
    }
}