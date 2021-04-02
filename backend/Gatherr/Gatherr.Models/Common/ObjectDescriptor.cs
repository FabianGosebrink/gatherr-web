using System.Collections.Generic;

namespace Gatherr.Models.Common
{
    public class ObjectDescriptor<T> : IObjectDescriptor<T>
    {
        public T Value { get; set; }
        public List<LinkDto> Links { get; set; } = new List<LinkDto>();
        public dynamic Metadata { get; set; } = null;
    }
}
