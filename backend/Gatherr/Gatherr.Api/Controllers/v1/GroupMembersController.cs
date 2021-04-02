using Gatherr.Api.Hubs;
using Gatherr.Models.Dtos.Member;
using Gatherr.Services.ControllerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Gatherr.Api.Controllers.v1
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/groups/{groupLinkName}/members")]
    public class GroupMembersController : ControllerBase
    {
        private readonly IMembersControllerService _membersControllerService;
        private readonly IUserIdentityControllerService _userIdentityControllerService;
        private readonly IHubContext<GroupMembersHub> _groupMemberHub;

        public GroupMembersController(
            IMembersControllerService membersControllerService, 
            IUserIdentityControllerService userIdentityControllerService,
            IHubContext<GroupMembersHub> groupMemberHub)
        {
            _membersControllerService = membersControllerService;
            _userIdentityControllerService = userIdentityControllerService;
            _groupMemberHub = groupMemberHub;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("", Name = nameof(GetAllMembersofGroup))]
        public ActionResult GetAllMembersofGroup(string groupLinkName)
        {
            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            var result = _membersControllerService.GetGroupMembers(groupLinkName);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPut]
        [Route("{id:guid}", Name = nameof(UpdateGroupMember))]
        public ActionResult UpdateGroupMember(string groupLinkName, Guid id, [FromBody] GroupMemberUpdateDto updateDto)
        {
            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            if (updateDto == null)
            {
                return BadRequest();
            }

            if(id != updateDto.MemberId)
            {
                return BadRequest();
            }

            var result = _membersControllerService.UpdateGroupMember(groupLinkName, updateDto);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }


        [HttpPost(Name = nameof(AddCurrentUserAsGroupMember))]
        public async Task<ActionResult> AddCurrentUserAsGroupMember(string groupLinkName)
        {
            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            var currentuserEmail = _userIdentityControllerService.GetCurrentUsersEmail(User);

            var result = _membersControllerService.AddCurrentUserAsGroupMember(groupLinkName, currentuserEmail);

            if (result == null)
            {
                return NotFound();
            }

            await _groupMemberHub.Clients.All.SendAsync("groupmember-added", result);

            return Ok(result);
        }

        [HttpDelete("{id:guid}", Name = nameof(RemoveMemberFromGroup))]
        public async Task<ActionResult> RemoveMemberFromGroup(string groupLinkName, Guid id)
        {
            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            var result = _membersControllerService.RemoveMemberFromGroup(groupLinkName, id);

            if (result == null)
            {
                return NotFound();
            }

            await _groupMemberHub.Clients.All.SendAsync("groupmember-removed", result);

            return Ok(result);
        }
    }
}
