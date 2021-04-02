using Gatherr.Data.Context;
using Gatherr.Models.Entities;
using OfferingSolutions.GenericEFCore.RepositoryContext;

namespace Gatherr.Data.Repositories
{
    public class MeetupMemberRepository : GenericRepositoryContext<MeetupMemberEntity>, IMeetupMemberRepository
    {
        public MeetupMemberRepository(GatherrDbContext dbContext)
           : base(dbContext)
        {

        }
    }
}
