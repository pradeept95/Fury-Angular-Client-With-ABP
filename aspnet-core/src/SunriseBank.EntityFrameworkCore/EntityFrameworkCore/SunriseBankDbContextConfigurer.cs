using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace SunriseBank.EntityFrameworkCore
{
    public static class SunriseBankDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<SunriseBankDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<SunriseBankDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
