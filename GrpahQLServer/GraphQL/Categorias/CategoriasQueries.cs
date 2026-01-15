using GraphQLServer.Models;
using GrpahQLServer.Data;

namespace GrpahQLServer.GraphQL.Categorias;

[ExtendObjectType(OperationTypeNames.Query)]
public class CategoriasQueries
{
    [UsePaging(DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Categoria> GetCategorias(BlogContext context)
        => context.Categorias;

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<Categoria?> GetCategoria(BlogContext context, int id)
        => context.Categorias.Where(u => u.Id == id);
}
