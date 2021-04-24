using System;
using Gatherr.Data.Context;
using Gatherr.Data.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace Gatherr.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            // Initializes db.
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<GatherrDbContext>();
                    var dbInitializer = services.GetRequiredService<ISeedDataService>();
                    dbInitializer.Initialize(context).GetAwaiter().GetResult();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>œ
             Host.CreateDefaultBuilder(args)
                 .ConfigureWebHostDefaults(webBuilder =>
                     webBuilder.ConfigureAppConfiguration(config =>
                     {
                         // var settings = config.Build();
                         // var connection = settings.GetConnectionString("AppConfig");
                         // config.AddAzureAppConfiguration(connection);
                     }).UseStartup<Startup>());
    }
}
