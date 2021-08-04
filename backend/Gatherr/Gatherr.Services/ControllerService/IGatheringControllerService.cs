using Gatherr.Models.Common;
using Gatherr.Models.Dtos;
using Gatherr.Models.Dtos.Gatherings;
using System;
using System.Collections.Generic;

namespace Gatherr.Services.ControllerService
{
    public interface IGatheringControllerService
    {
        IObjectDescriptor<List<GatheringDto>> GetAllGatheringsFromGroup(string groupLinkName);
        IObjectDescriptor<List<GatheringDto>> GetAllPersonalGatherings(string username);
        IObjectDescriptor<GatheringDto> GetSingle(string groupLinkName, string gatheringLinkName);
        IObjectDescriptor<object> Remove(Guid id);
        IObjectDescriptor<GatheringDto> Update(Guid id, GatheringUpdateDto updateDto);
        IGatheringControllerService WithController(string controllerName);
        IObjectDescriptor<GatheringDto> AddGatheringToGroup(string existingGroupId, GatheringCreateDto createDto, string currentUsername);
        IObjectDescriptor<List<GatheringDto>> GetGatheringsInArea(GatheringsFilterDto gatheringsFilterDto);
    }
}