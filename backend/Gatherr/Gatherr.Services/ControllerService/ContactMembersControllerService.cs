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
        private readonly IMeetupMemberRepository _meetupMemberRepository;

        public ContactMembersControllerService(
            IGroupMemberRepository groupMemberRepository,
            IMeetupMemberRepository meetupMemberRepository, 
            IEmailService emailService)
        {
            _emailService = emailService;
            _groupMemberRepository = groupMemberRepository;
            _meetupMemberRepository = meetupMemberRepository;
        }

        public async Task<bool> ContactGatheringAsync(ContactGatheringDto contactGatheringDto)
        {
            IQueryable<MeetupMemberEntity> meetupMembers = _meetupMemberRepository
                .GetAll(predicate: x => x.MeetupId == contactGatheringDto.GatheringId, 
                    include: source => source.Include(y => y.UserProfile));

            var emails = meetupMembers.Select(x => x.UserProfile.UserIdentifier).ToList();

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
