using Gatherr.Data.Context;
using Gatherr.Models.Entities;
using OfferingSolutions.GenericEFCore.RepositoryContext;

namespace Gatherr.Data.Repositories
{
    public class GroupMemberRepository : GenericRepositoryContext<GroupMemberEntity>, IGroupMemberRepository
    {
        public GroupMemberRepository(GatherrDbContext dbContext)
           : base(dbContext)
        {

        }
    }
}
