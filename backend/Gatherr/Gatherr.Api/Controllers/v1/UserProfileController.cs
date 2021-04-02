using Gatherr.Models.Dtos.UserProfile;
using Gatherr.Services.ControllerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Gatherr.Api.Controllers.v1
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileControllerService _userProfileControllerService;
        private readonly IUserIdentityControllerService _userIdentityControllerService;

        public UserProfileController(
            IUserProfileControllerService userProfileControllerService, 
            IUserIdentityControllerService userIdentityControllerService)
        {
            _userProfileControllerService = userProfileControllerService;
            _userIdentityControllerService = userIdentityControllerService;
        }

        [HttpGet]
        [Route("", Name = nameof(GetCurrentUserProfile))]
        public ActionResult GetCurrentUserProfile()
        {
            var currentuserEmail = _userIdentityControllerService.GetCurrentUsersEmail(User);

            var result = _userProfileControllerService.GetUserProfile(currentuserEmail);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("{id:guid}", Name = nameof(GetUserProfile))]
        public ActionResult GetUserProfile(Guid id)
        {
            var result = _userProfileControllerService.GetUserProfile(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost("", Name = nameof(AddUserProfile))]
        public ActionResult AddUserProfile(ApiVersion apiVersion, [FromBody] UserProfileCreateDto createDto)
        {
            if (createDto == null)
            {
                return BadRequest();
            }

            var existingUserProfile = _userProfileControllerService.GetUserProfile(createDto.UserIdentifier);

            if (existingUserProfile != null)
            {
                return Ok(existingUserProfile);
            }

            var result = _userProfileControllerService.AddUserProfile(createDto);

            if (result == null)
            {
                return NotFound();
            }

            return CreatedAtRoute(
                nameof(UserProfileController.GetUserProfile),
                new
                {
                    id = result.Value.Id,
                    version = apiVersion.ToString()
                },
                result);
        }

        [HttpPut]
        [Route("{id:guid}", Name = nameof(UpdateUserProfile))]
        public ActionResult UpdateUserProfile(Guid id, [FromBody] UserProfileUpdateDto userProfileUpdateDto)
        {
            if (userProfileUpdateDto == null)
            {
                return BadRequest();
            }

            var existingUserProfile = _userProfileControllerService.GetUserProfile(id);

            if (existingUserProfile == null)
            {
                return NotFound("profile with " + id + " not found");
            }

            var result = _userProfileControllerService.UpdateUserProfile(id, userProfileUpdateDto);

            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }
    }
}
