using System.Linq;
using System.Security.Claims;

namespace Gatherr.Services.ControllerService
{
    public class UserIdentityControllerService : IUserIdentityControllerService
    {
        public string GetCurrentUsersEmail(ClaimsPrincipal user)
        {
            return user.Claims.FirstOrDefault(claim => claim.Type == "email").Value;
        }
    }
}
