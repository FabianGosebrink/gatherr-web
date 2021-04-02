using Gatherr.Models.Dtos.Contact;
using Gatherr.Services.ControllerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Gatherr.Api.Controllers.v1
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ContactMembersController : ControllerBase
    {
        private readonly IContactMembersControllerService _controllerService;

        public ContactMembersController(IContactMembersControllerService contactMembersControllerService)
        {
            _controllerService = contactMembersControllerService;
        }

        [HttpPost]
        [Route("contactgroup", Name = nameof(ContactGroup))]
        public async Task<ActionResult> ContactGroup([FromBody] ContactGroupDto contactGroupDto)
        {
            if (contactGroupDto == null)
            {
                return BadRequest();
            }

            var success = await _controllerService.ContactGroupAsync(contactGroupDto);

            if (success)
            {
                return Ok();
            }

            return StatusCode(500);
        }

        [HttpPost]
        [Route("contactgathering", Name = nameof(ContactGathering))]
        public async Task<ActionResult> ContactGathering([FromBody]ContactGatheringDto contactGatheringDto)
        {
            if (contactGatheringDto == null)
            {
                return BadRequest();
            }

            var success = await _controllerService.ContactGatheringAsync(contactGatheringDto);

            if (success)
            {
                return Ok();
            }

            return StatusCode(500);
        }
    }
}
