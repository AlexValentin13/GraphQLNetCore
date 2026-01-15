using AutoMapper;
using GraphQLServer.Models;
using GrpahQLServer.Data;
using GrpahQLServer.GraphQL.Types;

namespace GrpahQLServer.GraphQL.Categorias;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class CategoriasMutations
{
    public async Task<CategoriaPayload> CreateCategoria (
        BlogContext context,
        [Service] IMapper mapper,
        CategoriaInputType inputCategoria
    ) {
        var categoria = mapper.Map<Categoria>(inputCategoria);

        await context.Categorias.AddAsync(categoria);
        await context.SaveChangesAsync();

        return mapper.Map<CategoriaPayload>(categoria);
    }

    public async Task<CategoriaPayload> UpdateCategoria(
        BlogContext context,
        [Service] IMapper mapper,
        int id,
        CategoriaInputType inputCategoria
    )
    {
        var categoria = mapper.Map<Categoria>(inputCategoria);
        categoria.Id = id;

        context.Categorias.Update(categoria);
        await context.SaveChangesAsync();

        return mapper.Map<CategoriaPayload>(categoria);
    }

    public async Task<bool> DeleteCategoria(BlogContext context, int id)
    {
        try
        {
            var categoriaDb = await context.Categorias.FindAsync(id);

            if (categoriaDb is null) return false;

            context.Categorias.Remove(categoriaDb);
            await context.SaveChangesAsync();

            return true;

        }
        catch (Exception)
        {
            return false;
        }
    }
}
