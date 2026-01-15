using GraphQLServer.Models;
using GrpahQLServer.Data;
using GrpahQLServer.GraphQL.Types;

namespace GrpahQLServer.GraphQL;

public class Mutation
{
    public async Task<PublicacionPayload> CreatePublicacion(BlogContext context, PublicacionInputType inputPublicacion)
    {
        var publicación = new Publicacion()
        {
            AutorId = inputPublicacion.AutorId,
            CategoriaId = inputPublicacion.CategoriaId,
            Contenido = inputPublicacion.Contenido,
            Estado = inputPublicacion.Estado,
            ImagenUrl = inputPublicacion.ImagenUrl,
            Rating = inputPublicacion.Rating,
            Titulo = inputPublicacion.Titulo
        };

        await context.Publicaciones.AddAsync(publicación);
        await context.SaveChangesAsync();

        return new PublicacionPayload()
        {
            Id = publicación.Id,
            AutorId = publicación.AutorId,
            CategoriaId = publicación.CategoriaId,
            Contenido = publicación.Contenido,
            Estado = publicación.Estado,
            ImagenUrl = publicación.ImagenUrl,
            Rating = publicación.Rating,
            Titulo = publicación.Titulo
        };
    }

    // El siguiente método fue creado para poder actualizar una publicación
    public async Task<PublicacionPayload> UpdatePublicacion(BlogContext context, int id, PublicacionInputType inputPublicacion)
    {
        var publicacion = new Publicacion()
        {
            Id = id,
            AutorId = inputPublicacion.AutorId,
            CategoriaId = inputPublicacion.CategoriaId,
            Contenido = inputPublicacion.Contenido,
            Estado = inputPublicacion.Estado,
            ImagenUrl = inputPublicacion.ImagenUrl,
            Rating = inputPublicacion.Rating,
            Titulo = inputPublicacion.Titulo
        };

        context.Publicaciones.Update(publicacion);
        await context.SaveChangesAsync();

        return new PublicacionPayload()
        {
            Id = publicacion.Id,
            AutorId = publicacion.AutorId,
            CategoriaId = publicacion.CategoriaId,
            Contenido = publicacion.Contenido,
            Estado = publicacion.Estado,
            ImagenUrl = publicacion.ImagenUrl,
            Rating = publicacion.Rating,
            Titulo = publicacion.Titulo
        };
    }

    public async Task<bool> DeletePublicacion(BlogContext context, int id)
    {
        try
        {
            var publicacionDb = await context.Publicaciones.FindAsync(id);

            if (publicacionDb is null) return false;

            context.Publicaciones.Remove(publicacionDb);

            return true;

        }
        catch (Exception)
        {
            return false;
        }
    }
}