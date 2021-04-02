using Gatherr.Api.Hubs;
using Gatherr.Models.Dtos;
using Gatherr.Models.Dtos.Meetups;
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
    [Route("api/v{version:apiVersion}")]
    public class MeetupsController : ControllerBase
    {
        private readonly IMeetupControllerService _controllerService;
        private readonly IUserIdentityControllerService _userIdentityControllerService;
        private readonly IHubContext<MeetupsHub> _meetupsHub;

        public MeetupsController(
            IMeetupControllerService controllerService,
            IUserIdentityControllerService userIdentityControllerService,
            IHubContext<MeetupsHub> meetupsHub)
        {
            _controllerService = controllerService.WithController("Meetups");
            _userIdentityControllerService = userIdentityControllerService;
            _meetupsHub = meetupsHub;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("[controller]", Name = nameof(GetAllMeetupsFromArea))]
        public ActionResult GetAllMeetupsFromArea([FromQuery] MeetupsFilterDto filterDto = null)
        {
            if (filterDto == null)
            {
                return BadRequest("Please provide a filter");
            }

            if (String.IsNullOrEmpty(filterDto.Country))
            {
                return BadRequest("Please provide at least a country");
            }

            var result = _controllerService.GetMeetupsInArea(filterDto);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("groups/{groupLinkName}/[controller]", Name = nameof(GetAllMeetupsFromGroup))]
        public ActionResult GetAllMeetupsFromGroup(string groupLinkName)
        {
            var result = _controllerService.GetAllMeetupsFromGroup(groupLinkName);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("groups/{groupLinkName}/[controller]/{meetupLinkName}", Name = nameof(GetSingleMeetup))]
        public ActionResult GetSingleMeetup(string groupLinkName, string meetupLinkName)
        {
            var result = _controllerService.GetSingle(groupLinkName, meetupLinkName);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }


        [HttpPost("groups/{groupLinkName}/[controller]", Name = nameof(AddMeetupToGroup))]
        public async Task<ActionResult> AddMeetupToGroup(ApiVersion apiVersion, string groupLinkName, 
            [FromBody] MeetupCreateDto createDto)
        {
            if (createDto == null)
            {
                return BadRequest();
            }

            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            var currentuserEmail = _userIdentityControllerService.GetCurrentUsersEmail(User);

            var result = _controllerService.AddMeetupToGroup(groupLinkName, createDto, currentuserEmail);

            if (result == null)
            {
                return NotFound();
            }

            await _meetupsHub.Clients.All.SendAsync("meetup-added", result);

            return CreatedAtRoute(
                nameof(MeetupsController.GetSingleMeetup),
                new
                {
                    groupLinkName = result.Value.GroupLinkName,
                    meetupLinkName = result.Value.LinkName,
                    version = apiVersion.ToString()
                },
                result);
        }


        [HttpDelete]
        [Route("groups/{groupLinkName}/[controller]/{id:guid}", Name = nameof(RemoveMeetup))]
        public async Task<ActionResult> RemoveMeetup(string groupLinkName, Guid id)
        {
            var result = _controllerService.Remove(id);

            if (result == null)
            {
                return NotFound();
            }

            await _meetupsHub.Clients.All.SendAsync("meetup-removed", id);

            return NoContent();
        }

        [HttpPut]
        [Route("groups/{groupLinkName}/[controller]/{id:guid}", Name = nameof(UpdateMeetup))]
        public ActionResult<MeetupDto> UpdateMeetup(string groupLinkName, Guid id, [FromBody]MeetupUpdateDto updateDto)
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

            return Ok(result);
        }
    }
}
