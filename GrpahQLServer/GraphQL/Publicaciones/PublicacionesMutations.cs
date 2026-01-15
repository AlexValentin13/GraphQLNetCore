using AutoMapper;
using GraphQLServer.Models;
using GrpahQLServer.Data;
using GrpahQLServer.GraphQL.Types;

namespace GrpahQLServer.GraphQL.Publicaciones;


[ExtendObjectType(OperationTypeNames.Mutation)]
public class PublicacionesMutations
{
    public async Task<PublicacionPayload> CreatePublicacion (
        BlogContext context,
        [Service] IMapper mapper,
        PublicacionInputType inputPublicacion
    ) {
        var publicacion = mapper.Map<Publicacion>(inputPublicacion);

        await context.Publicaciones.AddAsync(publicacion);
        await context.SaveChangesAsync();

        return mapper.Map<PublicacionPayload>(publicacion);
    }

    // El siguiente método fue creado para poder actualizar una publicación
    public async Task<PublicacionPayload> UpdatePublicacion (
        BlogContext context,
        [Service] IMapper mapper,
        int id,
        PublicacionInputType inputPublicacion
    ) {
        var publicacion = mapper.Map<Publicacion>(inputPublicacion);
        publicacion.Id = id;

        context.Publicaciones.Update(publicacion);
        await context.SaveChangesAsync();

        return mapper.Map<PublicacionPayload>(publicacion);
    }

    public async Task<bool> DeletePublicacion(BlogContext context, int id)
    {
        try
        {
            var publicacionDb = await context.Publicaciones.FindAsync(id);

            if (publicacionDb is null) return false;

            context.Publicaciones.Remove(publicacionDb);
            await context.SaveChangesAsync();

            return true;

        }
        catch (Exception)
        {
            return false;
        }
    }
}