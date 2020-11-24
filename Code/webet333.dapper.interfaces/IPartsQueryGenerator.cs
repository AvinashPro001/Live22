namespace Webet333.dapper.interfaces
{
    public interface IPartsQueryGenerator<TEntity> where TEntity : class
    {
        string GenerateSelect();

        string GenerateSelect(object fieldsFilter);

        string GeneratePartInsert(string identityField = null);

        string GenerateDelete(object parameters);

        string GenerateUpdate(object pks);
    }
}