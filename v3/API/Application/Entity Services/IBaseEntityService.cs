namespace Application.Services.Authentication
{
    public interface IBaseEntityService<T> where T: class
    {
        Task<List<T>> GetAsync(CancellationToken cancellationToken);
        Task<T?> GetAsync(Guid id, CancellationToken cancellationToken);
        Task<T> CreateAsync(T record, CancellationToken cancellationToken);
        Task<IEnumerable<T>> CreateBulkAsync(IEnumerable<T> records, CancellationToken cancellationToken);
        Task<T> UpdateAsync(Guid id, T updatedRecord, CancellationToken cancellationToken);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken);
        Task DeleteBulkAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken);
    }
}
