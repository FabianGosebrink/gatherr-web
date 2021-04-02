using Gatherr.Models.Dtos.Contact;
using System.Threading.Tasks;

namespace Gatherr.Services.ControllerService
{
    public interface IContactMembersControllerService
    {
        Task<bool> ContactGroupAsync(ContactGroupDto contactGroupDto);
        Task<bool> ContactGatheringAsync(ContactGatheringDto contactGatheringDto);
    }
}