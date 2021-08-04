using Gatherr.Models.Common;
using Gatherr.Services.ControllerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Gatherr.Api.Controllers.v1
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class PersonalController : ControllerBase
    {
        private readonly IGroupsControllerService _groupsControllerService;
        private readonly IGatheringControllerService _gatheringControllerService;
        private readonly IUserIdentityControllerService _userIdentityControllerService;

        public PersonalController(
            IGroupsControllerService groupsControllerService,
            IGatheringControllerService gatheringControllerService,
            IUserIdentityControllerService userIdentityControllerService)
        {
            _groupsControllerService = groupsControllerService.WithController("Groups");
            _gatheringControllerService = gatheringControllerService.WithController("Gatherings");
            _userIdentityControllerService = userIdentityControllerService;
        }


        [HttpGet]
        [Route("groups", Name = nameof(GetAllPersonalGroups))]
        public ActionResult GetAllPersonalGroups([FromQuery] GroupsQueryParameters queryParameters)
        {
            var currentUserIdentifier = _userIdentityControllerService.GetCurrentUsersIdentifier(User);

            var result = _groupsControllerService.GetAllPersonalGroups(currentUserIdentifier, queryParameters);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("gatherings", Name = nameof(GetAllPersonalGatherings))]
        public ActionResult GetAllPersonalGatherings()
        {
            var currentUserIdentifier = _userIdentityControllerService.GetCurrentUsersIdentifier(User);

            var result = _gatheringControllerService.GetAllPersonalGatherings(currentUserIdentifier);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}
