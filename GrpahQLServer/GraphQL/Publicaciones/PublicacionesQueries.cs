using GraphQLServer.Models;
using GrpahQLServer.Data;

namespace GrpahQLServer.GraphQL.Publicaciones;

[ExtendObjectType(OperationTypeNames.Query)]
public class PublicacionesQueries
{
    // Resolver 1: este método retorna las publicaciones.
    // Ya que este método tiene acceso al contexto de la base de datos, puede acceder
    // sin problemas a la DB

    [UsePaging(DefaultPageSize = 20)] // Aquí se establece el tamaño por defecto de la paginación
    //[UseOffsetPaging(IncludeTotalCount = true)] // Este tipo de paginación es el más usado en Asp.net core
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Publicacion> GetPublicaciones(BlogContext context)
        => context.Publicaciones;


    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<Publicacion?> GetPublicacion(BlogContext context, int id)
        => context.Publicaciones.Where(u => u.Id == id);

}
