using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using SunriseBank.Authorization.Roles;
using SunriseBank.Authorization.Users;
using SunriseBank.MultiTenancy;
using SunriseBank.Entity;

namespace SunriseBank.EntityFrameworkCore
{
    public class SunriseBankDbContext : AbpZeroDbContext<Tenant, Role, User, SunriseBankDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public SunriseBankDbContext(DbContextOptions<SunriseBankDbContext> options)
            : base(options)
        {
        } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        #region Activity Log 
        public DbSet<ActivityLog> ActivityLogs { get; set; }
        #endregion

        #region Global Configuration
        public DbSet<GlobalConfiguration> GlobalConfigurations { get; set; }
        public DbSet<GlobalConfigurationDetail> GlobalConfigurationDetails { get; set; }
        #endregion

        #region Email And SMS Template
        public DbSet<Template> Templates { get; set; }
        #endregion

        #region Application User 
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationUserDocument> ApplicationUserDocuments { get; set; }
        public DbSet<ApplicationUserPasswordHistory> ApplicationUserPasswordHistories { get; set; }
        #endregion

    }
}
