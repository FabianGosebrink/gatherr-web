using Gatherr.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Gatherr.Api.Controllers.v1
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class MemberRolesController : ControllerBase
    {
        [HttpGet]
        [Route("groups", Name = nameof(GetAllGroupRoles))]
        public ActionResult GetAllGroupRoles()
        {
            return Ok(Enum.GetValues(typeof(GroupRole)));
        }

        [HttpGet]
        [Route("meetups", Name = nameof(GetAllMeetupRoles))]
        public ActionResult GetAllMeetupRoles()
        {
            return Ok(Enum.GetValues(typeof(MeetupRole)));
        }
    }
}
