using Gatherr.Data.Context;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Gatherr.Data.Services
{
    public interface ISeedDataService
    {
        Task Initialize(GatherrDbContext context);
    }
}
