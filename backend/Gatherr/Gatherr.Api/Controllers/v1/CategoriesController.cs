using Gatherr.Services.ControllerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Gatherr.Api.Controllers.v1
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryControllerService _controllerService;

        public CategoriesController(ICategoryControllerService categoryControllerService)
        {
            _controllerService = categoryControllerService;
        }

        [HttpGet]
        [Route("", Name = nameof(GetAllCategories))]
        public ActionResult GetAllCategories()
        {
            var result = _controllerService.GetAllCategories();

            return Ok(result);
        }
    }
}
