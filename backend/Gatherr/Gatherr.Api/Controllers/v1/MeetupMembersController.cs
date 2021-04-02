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
    [Route("api/v{version:apiVersion}/groups/{groupLinkName}/meetups/{meetupId}/members")]
    public class MeetupMembersController : ControllerBase
    {
        private readonly IMembersControllerService _membersControllerService;
        private readonly IUserIdentityControllerService _userIdentityControllerService;
        private readonly IHubContext<MeetupMembersHub> _meetupMembersHub;

        public MeetupMembersController(
            IMembersControllerService membersControllerService, 
            IUserIdentityControllerService userIdentityControllerService, 
            IHubContext<MeetupMembersHub> meetupMembersHub)
        {
            _membersControllerService = membersControllerService;
            _userIdentityControllerService = userIdentityControllerService;
            _meetupMembersHub = meetupMembersHub;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("", Name = nameof(GetAllMeetupAttendees))]
        public ActionResult GetAllMeetupAttendees(string groupLinkName, Guid meetupId)
        {
            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            var result = _membersControllerService.GetAllMeetupAttendees(groupLinkName, meetupId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost("", Name = nameof(AddCurrentUserAsMeetupMember))]
        public async Task<ActionResult> AddCurrentUserAsMeetupMember(string groupLinkName, Guid meetupId)
        {
            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            var currentuserEmail = _userIdentityControllerService.GetCurrentUsersEmail(User);

            var result = _membersControllerService.AddCurrentUserAsMeetupMember(groupLinkName, meetupId, currentuserEmail);

            if (result == null)
            {
                return NotFound();
            }

            await _meetupMembersHub.Clients.All.SendAsync("meetupmember-added", result);

            return Ok(result);
        }

        [HttpPut]
        [Route("{id:guid}", Name = nameof(UpdateMeetupMember))]
        public async Task<ActionResult> UpdateMeetupMember(string groupLinkName, Guid meetupId, Guid id, [FromBody] MeetupMemberUpdateDto updateDto)
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

            var result = _membersControllerService.UpdateMeetupMember(groupLinkName, meetupId, updateDto);

            if (result == null)
            {
                return NotFound();
            }

            await _meetupMembersHub.Clients.All.SendAsync("meetupmember-updated", result);

            return Ok(result);
        }


        [HttpDelete("{id:guid}", Name = nameof(RemoveMemberFromMeetup))]
        public async Task<ActionResult> RemoveMemberFromMeetup(string groupLinkName, Guid meetupId, Guid id)
        {
            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            var result = _membersControllerService.RemoveMemberFromMeetup(groupLinkName, meetupId, id);

            if (result == null)
            {
                return NotFound();
            }

            await _meetupMembersHub.Clients.All.SendAsync("meetupmember-removed", result);

            return Ok(result);
        }
    }
}
