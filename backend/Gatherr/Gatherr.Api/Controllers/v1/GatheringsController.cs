using Gatherr.Api.Hubs;
using Gatherr.Models.Dtos;
using Gatherr.Models.Dtos.Gatherings;
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
    public class GatheringsController : ControllerBase
    {
        private readonly IGatheringControllerService _controllerService;
        private readonly IUserIdentityControllerService _userIdentityControllerService;
        private readonly IHubContext<GatheringsHub> _gatheringsHub;

        public GatheringsController(
            IGatheringControllerService controllerService,
            IUserIdentityControllerService userIdentityControllerService,
            IHubContext<GatheringsHub> gatheringsHub)
        {
            _controllerService = controllerService.WithController("Gatherings");
            _userIdentityControllerService = userIdentityControllerService;
            _gatheringsHub = gatheringsHub;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("[controller]", Name = nameof(GetAllGatheringsFromArea))]
        public ActionResult GetAllGatheringsFromArea([FromQuery] GatheringsFilterDto filterDto = null)
        {
            if (filterDto == null)
            {
                return BadRequest("Please provide a filter");
            }

            if (String.IsNullOrEmpty(filterDto.Country))
            {
                return BadRequest("Please provide at least a country");
            }

            var result = _controllerService.GetGatheringsInArea(filterDto);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("groups/{groupLinkName}/[controller]", Name = nameof(GetAllGatheringsFromGroup))]
        public ActionResult GetAllGatheringsFromGroup(string groupLinkName)
        {
            var result = _controllerService.GetAllGatheringsFromGroup(groupLinkName);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("groups/{groupLinkName}/[controller]/{gatheringLinkName}", Name = nameof(GetSingleGathering))]
        public ActionResult GetSingleGathering(string groupLinkName, string gatheringLinkName)
        {
            var result = _controllerService.GetSingle(groupLinkName, gatheringLinkName);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }


        [HttpPost("groups/{groupLinkName}/[controller]", Name = nameof(AddGatheringToGroup))]
        public async Task<ActionResult> AddGatheringToGroup(ApiVersion apiVersion, string groupLinkName, 
            [FromBody] GatheringCreateDto createDto)
        {
            if (createDto == null)
            {
                return BadRequest();
            }

            if (String.IsNullOrEmpty(groupLinkName))
            {
                return BadRequest();
            }

            var currentUserIdentifier = _userIdentityControllerService.GetCurrentUsersIdentifier(User);

            var result = _controllerService.AddGatheringToGroup(groupLinkName, createDto, currentUserIdentifier);

            if (result == null)
            {
                return NotFound();
            }

            await _gatheringsHub.Clients.All.SendAsync("gathering-added", result);

            return CreatedAtRoute(
                nameof(GatheringsController.GetSingleGathering),
                new
                {
                    groupLinkName = result.Value.GroupLinkName,
                    gatheringLinkName = result.Value.LinkName,
                    version = apiVersion.ToString()
                },
                result);
        }


        [HttpDelete]
        [Route("groups/{groupLinkName}/[controller]/{id:guid}", Name = nameof(RemoveGathering))]
        public async Task<ActionResult> RemoveGathering(string groupLinkName, Guid id)
        {
            var result = _controllerService.Remove(id);

            if (result == null)
            {
                return NotFound();
            }

            await _gatheringsHub.Clients.All.SendAsync("gathering-removed", id);

            return NoContent();
        }

        [HttpPut]
        [Route("groups/{groupLinkName}/[controller]/{id:guid}", Name = nameof(UpdateGathering))]
        public ActionResult<GatheringDto> UpdateGathering(string groupLinkName, Guid id, [FromBody]GatheringUpdateDto updateDto)
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
