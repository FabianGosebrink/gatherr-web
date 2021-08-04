using Gatherr.Api.Hubs;
using Gatherr.Models.Dtos.Member;
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
    [Route("api/v{version:apiVersion}/groups/{groupLinkName}/gatherings/{gatheringId}/members")]
    public class GatheringMembersController : ControllerBase
    {
        private readonly IMembersControllerService _membersControllerService;
        private readonly IUserIdentityControllerService _userIdentityControllerService;
        private readonly IHubContext<GatheringMembersHub> _gatheringMembersHub;

        public GatheringMembersController(
            IMembersControllerService membersControllerService, 
            IUserIdentityControllerService userIdentityControllerService, 
            IHubContext<GatheringMembersHub> gatheringMembersHub)
        {
            _membersControllerService = membersControllerService;
            _userIdentityControllerService = userIdentityControllerService;
            _gatheringMembersHub = gatheringMembersHub;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("", Name = nameof(GetAllGatheringAttendees))]
        public ActionResult GetAllGatheringAttendees(string groupLinkName, Guid gatheringId)
        {
            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            var result = _membersControllerService.GetAllGatheringAttendees(groupLinkName, gatheringId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost("", Name = nameof(AddCurrentUserAsGatheringMember))]
        public async Task<ActionResult> AddCurrentUserAsGatheringMember(string groupLinkName, Guid gatheringId)
        {
            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            var currentUserIdentifier = _userIdentityControllerService.GetCurrentUsersIdentifier(User);

            var result = _membersControllerService.AddCurrentUserAsGatheringMember(groupLinkName, gatheringId, currentUserIdentifier);

            if (result == null)
            {
                return NotFound();
            }

            await _gatheringMembersHub.Clients.All.SendAsync("gatheringmember-added", result);

            return Ok(result);
        }

        [HttpPut]
        [Route("{id:guid}", Name = nameof(UpdateGatheringMember))]
        public async Task<ActionResult> UpdateGatheringMember(string groupLinkName, Guid gatheringId, Guid id, [FromBody] GatheringMemberUpdateDto updateDto)
        {
            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            if (updateDto == null)
            {
                return BadRequest();
            }

            if (id != updateDto.MemberId)
            {
                return BadRequest();
            }

            var result = _membersControllerService.UpdateGatheringMember(groupLinkName, gatheringId, updateDto);

            if (result == null)
            {
                return NotFound();
            }

            await _gatheringMembersHub.Clients.All.SendAsync("gatheringmember-updated", result);

            return Ok(result);
        }


        [HttpDelete("{id:guid}", Name = nameof(RemoveMemberFromGathering))]
        public async Task<ActionResult> RemoveMemberFromGathering(string groupLinkName, Guid gatheringId, Guid id)
        {
            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            var result = _membersControllerService.RemoveMemberFromGathering(groupLinkName, gatheringId, id);

            if (result == null)
            {
                return NotFound();
            }

            await _gatheringMembersHub.Clients.All.SendAsync("gatheringmember-removed", result);

            return Ok(result);
        }
    }
}
