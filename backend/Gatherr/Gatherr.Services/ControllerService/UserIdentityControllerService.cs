using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Security.Claims;

namespace Gatherr.Services.ControllerService
{
    public class UserIdentityControllerService : IUserIdentityControllerService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserIdentityControllerService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentUsersIdentifier(ClaimsPrincipal user)
        {
            return _httpContextAccessor.HttpContext?.User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).SingleOrDefault()?.Value;
        }
    }
}
