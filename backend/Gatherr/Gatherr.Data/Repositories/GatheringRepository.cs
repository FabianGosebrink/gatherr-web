using Gatherr.Data.Context;
using Gatherr.Models.Entities;
using OfferingSolutions.GenericEFCore.RepositoryContext;

namespace Gatherr.Data.Repositories
{
    public class GatheringRepository : GenericRepositoryContext<GatheringEntity>, IGatheringRepository
    {
        public GatheringRepository(GatherrDbContext dbContext)
            : base(dbContext)
        {

        }
    }
}
