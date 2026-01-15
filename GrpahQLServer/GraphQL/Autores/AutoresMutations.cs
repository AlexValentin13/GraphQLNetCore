using AutoMapper;
using GraphQLServer.Models;
using GrpahQLServer.Data;
using GrpahQLServer.GraphQL.Types;

namespace GrpahQLServer.GraphQL.Autores;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class AutoresMutations
{
    public async Task<AutorPayload> CreateAutor 
        (
        BlogContext context,
        [Service] IMapper mapper,
        AutorInputType inputAutor
    ) {
        var autor = mapper.Map<Autor>(inputAutor);

        await context.Autores.AddAsync(autor);
        await context.SaveChangesAsync();

        return mapper.Map<AutorPayload>(autor);
    }

    public async Task<AutorPayload> UpdateAutor(
        BlogContext context,
        [Service] IMapper mapper,
        int id,
        AutorInputType inputAutor
    ) {
        var autor = mapper.Map<Autor>(inputAutor);
        autor.Id = id;

        context.Autores.Update(autor);
        await context.SaveChangesAsync();

        return mapper.Map<AutorPayload>(autor);
    }

    public async Task<bool> DeleteAutor(BlogContext context, int id)
    {
        try
        {
            var autorDb = await context.Autores.FindAsync(id);

            if (autorDb is null) return false;

            context.Autores.Remove(autorDb);
            await context.SaveChangesAsync();

            return true;

        }
        catch (Exception)
        {
            return false;
        }
    }
}