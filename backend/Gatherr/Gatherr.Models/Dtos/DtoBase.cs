using Gatherr.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gatherr.Models.Dtos
{
    public class DtoBase
    {
        public IEnumerable<LinkDto> Links { get; set; } = null;
    }
}
