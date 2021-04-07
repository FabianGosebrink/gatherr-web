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
        private readonly IMeetupControllerService _meetupControllerService;
        private readonly IUserIdentityControllerService _userIdentityControllerService;

        public PersonalController(
            IGroupsControllerService groupsControllerService,
            IMeetupControllerService meetupControllerService,
            IUserIdentityControllerService userIdentityControllerService)
        {
            _groupsControllerService = groupsControllerService.WithController("Groups");
            _meetupControllerService = meetupControllerService.WithController("Meetups");
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
        [Route("meetups", Name = nameof(GetAllPersonalMeetups))]
        public ActionResult GetAllPersonalMeetups()
        {
            var currentUserIdentifier = _userIdentityControllerService.GetCurrentUsersIdentifier(User);

            var result = _meetupControllerService.GetAllPersonalMeetups(currentUserIdentifier);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}
