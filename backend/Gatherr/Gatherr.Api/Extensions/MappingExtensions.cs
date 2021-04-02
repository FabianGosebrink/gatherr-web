using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace Gatherr.Api.Extensions
{
    public static class MappingExtensions
    {
        public static void AddMappingProfiles(this IServiceCollection services)
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies().Single(assembly => assembly.GetName().Name == "Gatherr.Services");
            services.AddAutoMapper(assemblies);
        }
    }
}
