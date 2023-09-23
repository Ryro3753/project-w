using Data.Attributes;
using Data.Converter;
using Data.Entities;
using Data.Models;
using Data.Models.Source;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace API.Data
{
    public class AppDbContext : DbContext
    {
        IOptions<AppSettingsValues> _appSettingsValues;
        public virtual DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options, IOptions<AppSettingsValues> appSettingsValues)
                : base(options)
        {
            _appSettingsValues = appSettingsValues;
        }

        public AppDbContext(IOptions<AppSettingsValues> appSettingsValues)
        {
            _appSettingsValues = appSettingsValues;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_appSettingsValues.Value.PostgreSqlConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            CharacterFeatureModelBuilderRegister(ref modelBuilder);
            base.OnModelCreating(modelBuilder);
        }

        private void CharacterFeatureModelBuilderRegister(ref ModelBuilder modelBuilder)
        {
            foreach (Type type in
            Assembly.GetAssembly(typeof(EntityBase)).GetTypes()
            .Where(myType => myType.IsClass && !myType.IsAbstract && myType.IsSubclassOf(typeof(EntityBase))))
            {
                var properties = type.GetProperties().Where(i => i.CustomAttributes.Any(q => q.AttributeType == typeof(SourceAttribute)));
                foreach (var property in properties)
                {
                    modelBuilder.Entity(type).Property(property.Name).HasConversion(typeof(JsonConverter<Source>));
                }
            }

        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            ChangeTracker.DetectChanges();

            var added = ChangeTracker.Entries()
            .Where(t => t.State == EntityState.Added)
            .Select(t => t.Entity);

            foreach (var inserted in added)
            {
                if (inserted is not EntityBase)
                {
                    continue;
                }
                var entity = (EntityBase)inserted;
                entity.CreatedDate = DateTime.UtcNow;
                entity.ModifiedDate = DateTime.UtcNow;
                entity.Id = Guid.NewGuid();
            }

            var modified = ChangeTracker.Entries()
            .Where(t => t.State == EntityState.Modified)
            .Select(t => t.Entity);

            foreach (var updated in modified)
            {
                if (updated is not EntityBase)
                {
                    continue;
                }
                var entity = (EntityBase)updated;
                entity.ModifiedDate = DateTime.UtcNow;
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}