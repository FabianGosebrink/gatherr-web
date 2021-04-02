using System;

namespace Gatherr.Models.Entities
{
    public interface IEntity
    {
        Guid Id { get; set; }
    }
}
