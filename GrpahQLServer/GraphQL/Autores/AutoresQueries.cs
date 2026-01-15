using GraphQLServer.Models;
using GrpahQLServer.Data;

namespace GrpahQLServer.GraphQL.Autores;


[ExtendObjectType(OperationTypeNames.Query)]
public class AutoresQueries
{
    [UsePaging(DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Autor> GetAutores(BlogContext context)
        => context.Autores;

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<Autor?> GetAutor(BlogContext context, int id)
        => context.Autores.Where(u => u.Id == id);
}