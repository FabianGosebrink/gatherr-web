using Gatherr.Data.Repositories;
using Gatherr.Email;
using Gatherr.Models.Dtos.Contact;
using Gatherr.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Gatherr.Services.ControllerService
{
    public class ContactMembersControllerService : IContactMembersControllerService
    {
        private readonly IEmailService _emailService;

        private readonly IGroupMemberRepository _groupMemberRepository;
        private readonly IGatheringMemberRepository _gatheringMemberRepository;

        public ContactMembersControllerService(
            IGroupMemberRepository groupMemberRepository,
            IGatheringMemberRepository gatheringMemberRepository, 
            IEmailService emailService)
        {
            _emailService = emailService;
            _groupMemberRepository = groupMemberRepository;
            _gatheringMemberRepository = gatheringMemberRepository;
        }

        public async Task<bool> ContactGatheringAsync(ContactGatheringDto contactGatheringDto)
        {
            IQueryable<GatheringMemberEntity> gatheringMembers = _gatheringMemberRepository
                .GetAll(predicate: x => x.GatheringId == contactGatheringDto.GatheringId, 
                    include: source => source.Include(y => y.UserProfile));

            var emails = gatheringMembers.Select(x => x.UserProfile.UserIdentifier).ToList();

            var success = await _emailService.SendEmailAsync(emails, contactGatheringDto.Subject, contactGatheringDto.Message);

            return success;
        }

        public async Task<bool> ContactGroupAsync(ContactGroupDto contactGroupDto)
        {
            IQueryable<GroupMemberEntity> groupMembers = _groupMemberRepository
                .GetAll(predicate: x => x.Group.Id == contactGroupDto.GroupId, 
                    include: source => source.Include(y => y.UserProfile));

            var emails = groupMembers.Select(x => x.UserProfile.UserIdentifier).ToList();

            var success = await _emailService.SendEmailAsync(emails, contactGroupDto.Subject, contactGroupDto.Message);

            return success;
        }
    }
}
