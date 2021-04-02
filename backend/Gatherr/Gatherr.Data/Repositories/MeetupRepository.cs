using Gatherr.Data.Context;
using Gatherr.Models.Entities;
using OfferingSolutions.GenericEFCore.RepositoryContext;

namespace Gatherr.Data.Repositories
{
    public class MeetupRepository : GenericRepositoryContext<MeetupEntity>, IMeetupRepository
    {
        public MeetupRepository(GatherrDbContext dbContext)
            : base(dbContext)
        {

        }
    }
}
