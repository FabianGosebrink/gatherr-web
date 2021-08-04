using Gatherr.Data.Context;
using Gatherr.Models.Entities;
using OfferingSolutions.GenericEFCore.RepositoryContext;

namespace Gatherr.Data.Repositories
{
    public class GatheringMemberRepository : GenericRepositoryContext<GatheringMemberEntity>, IGatheringMemberRepository
    {
        public GatheringMemberRepository(GatherrDbContext dbContext)
           : base(dbContext)
        {

        }
    }
}
