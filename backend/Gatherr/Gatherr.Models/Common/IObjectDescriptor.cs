using System.Collections.Generic;

namespace Gatherr.Models.Common
{
    public interface IObjectDescriptor<T>
    {
        List<LinkDto> Links { get; set; }
        T Value { get; set; }
        dynamic Metadata { get; set; }
    }
}