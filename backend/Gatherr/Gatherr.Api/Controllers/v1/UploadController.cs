using Gatherr.Services.ControllerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Gatherr.Api.Controllers.v1
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class UploadController : ControllerBase
    {
        private IUploadControllerService _uploadControllerService;

        public UploadController(IUploadControllerService uploadControllerService)
        {
            _uploadControllerService = uploadControllerService;
        }

        [HttpPost("profile"), DisableRequestSizeLimit]
        public async Task<ActionResult> UploadProfilePicture()
        {
            IFormFile file = Request.Form.Files[0];
            if(file == null)
            {
                return BadRequest();
            }

            var result = await _uploadControllerService.UploadFileBlobAsync("profiles", file);
            var toReturn = result.AbsoluteUri;

            return Ok(new { path = toReturn });
        }

        [HttpPost("meetup"), DisableRequestSizeLimit]
        public async Task<ActionResult> UploadGatheringPicture()
        {
            IFormFile file = Request.Form.Files[0];
            var result = await _uploadControllerService.UploadFileBlobAsync("gatherings", file);

            var toReturn = result.AbsoluteUri;

            return Ok(new { path = toReturn });
        }

        [HttpPost("group"), DisableRequestSizeLimit]
        public async Task<ActionResult> UploadGroupPicture()
        {
            IFormFile file = Request.Form.Files[0];
            var result = await _uploadControllerService.UploadFileBlobAsync("groups", file);

            var toReturn = result.AbsoluteUri;

            return Ok(new { path = toReturn });
        }
    }
}
