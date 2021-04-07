using Gatherr.Api.Hubs;
using Gatherr.Models.Common;
using Gatherr.Models.Dtos.Groups;
using Gatherr.Services.ControllerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace Gatherr.Api.Controllers.v1
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupsControllerService _controllerService;
        private readonly IUserIdentityControllerService _userIdentityControllerService;
        private readonly IHubContext<GroupsHub> _groupsHub;

        public GroupsController(
            IGroupsControllerService controllerService, 
            IUserIdentityControllerService userIdentityControllerService, 
            IHubContext<GroupsHub> groupsHub)
        {
            _controllerService = controllerService.WithController("Group");
            _userIdentityControllerService = userIdentityControllerService;
            _groupsHub = groupsHub;
        }

        [AllowAnonymous]
        [HttpGet(Name = nameof(GetAllGroups))]
        public ActionResult GetAllGroups([FromQuery] GroupsQueryParameters queryParameters)
        {
            var result = _controllerService.GetAll(queryParameters);

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("{groupLinkName}", Name = nameof(GetSingleGroup))]
        public ActionResult GetSingleGroup(string groupLinkName)
        {
            var result = _controllerService.GetGroupPerLinkName(groupLinkName);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }


        [HttpPost(Name = nameof(AddGroup))]
        public async Task<ActionResult> AddGroup(ApiVersion apiVersion, [FromBody] GroupCreateDto createDto)
        {
            if (createDto == null)
            {
                return BadRequest();
            }

            var currentUserIdentifier = _userIdentityControllerService.GetCurrentUsersIdentifier(User);

            var result = _controllerService.Add(createDto, currentUserIdentifier);

            if (result == null)
            {
                return NotFound();
            }

            await _groupsHub.Clients.All.SendAsync("group-added", result);

            return CreatedAtRoute(nameof(GetSingleGroup), new { groupLinkName = result.Value.LinkName, version = apiVersion.ToString() }, result);
        }

        [HttpDelete]
        [Route("{id:guid}", Name = nameof(RemoveGroup))]
        public async Task<ActionResult> RemoveGroup(Guid id)
        {
            var result = _controllerService.Remove(id);

            if (result == null)
            {
                return NotFound();
            }

            await _groupsHub.Clients.All.SendAsync("group-deleted", result);

            return NoContent();
        }

        [HttpPut]
        [Route("{id:guid}", Name = nameof(UpdateGroup))]
        public async Task<ActionResult> UpdateGroup(Guid id, [FromBody]GroupUpdateDto updateDto)
        {
            if (updateDto == null)
            {
                return BadRequest();
            }

            var result = _controllerService.Update(id, updateDto);

            if (result == null)
            {
                return NotFound();
            }

            await _groupsHub.Clients.All.SendAsync("group-updated", result);

            return Ok(result);
        }
    }
}
