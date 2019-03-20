using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using SunriseBank.Configuration;
using SunriseBank.Web;

namespace SunriseBank.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class SunriseBankDbContextFactory : IDesignTimeDbContextFactory<SunriseBankDbContext>
    {
        public SunriseBankDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<SunriseBankDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            SunriseBankDbContextConfigurer.Configure(builder, configuration.GetConnectionString(SunriseBankConsts.ConnectionStringName));

            return new SunriseBankDbContext(builder.Options);
        }
    }
}
