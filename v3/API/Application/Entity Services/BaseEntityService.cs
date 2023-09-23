using Data.Models;
using DataLayer.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Application.Entity_Services
{
    public abstract class BaseEntityService<T> where T : EntityBase
    {
        public readonly IMongoCollection<T> _collection;
        protected BaseEntityService(IOptions<AppSettingsValues> appSettings, string tableName)
        {
            var mongoClient = new MongoClient(
                appSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                appSettings.Value.DatabaseName);

            _collection = mongoDatabase.GetCollection<T>(tableName);
        }

        public async Task<List<T>> GetAsync(CancellationToken cancellationToken)
        {
            var collection = await _collection.FindAsync(i => true, null, cancellationToken);
            return await collection.ToListAsync(cancellationToken);
        }

        public async Task<T?> GetAsync(Guid id, CancellationToken cancellationToken)
        {
            var collection = await _collection.FindAsync(x => x.Id == id, null, cancellationToken);
            return await collection.FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<T> CreateAsync(T record, CancellationToken cancellationToken)
        {
            record.Id = Guid.NewGuid();
            record.CreatedDate = DateTime.UtcNow;
            record.ModifiedDate = DateTime.UtcNow;
            await _collection.InsertOneAsync(record, null, cancellationToken);
            return record;
        }

        public async Task<IEnumerable<T>> CreateBulkAsync(IEnumerable<T> records, CancellationToken cancellationToken)
        {
            foreach (var record in records)
            {
                record.Id = Guid.NewGuid();
                record.CreatedDate = DateTime.UtcNow;
                record.ModifiedDate = DateTime.UtcNow;
            }
            await _collection.InsertManyAsync(records, null, cancellationToken);
            return records;
        }

        public async Task<T> UpdateAsync(Guid id, T updatedRecord, CancellationToken cancellationToken)
        {
            updatedRecord.ModifiedDate = DateTime.UtcNow;
            await _collection.ReplaceOneAsync(x => x.Id == id, updatedRecord, cancellationToken: cancellationToken);
            return updatedRecord;
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            await _collection.DeleteOneAsync(x => x.Id == id, cancellationToken);
        }

        public async Task DeleteBulkAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken)
        {
            await _collection.DeleteManyAsync(i => ids.Contains(i.Id), cancellationToken);
        }
    }
}
