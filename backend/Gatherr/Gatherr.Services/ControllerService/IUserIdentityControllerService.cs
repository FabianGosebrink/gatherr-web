using System.Security.Claims;

namespace Gatherr.Services.ControllerService
{
    public interface IUserIdentityControllerService
    {
        string GetCurrentUsersIdentifier(ClaimsPrincipal user);
    }
}