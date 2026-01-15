using AutoMapper;
using GraphQLServer.Models;
using GrpahQLServer.GraphQL.Types;

namespace GrpahQLServer.Helpers;

public class MappingProfile: Profile
{
    // En este constructor se configuran los mapeos usando AutoMapper
    public MappingProfile()
    {
        // Esto indica que Publicacion se puede mapear a PublicacionType y viceversa
        // pero se excluyen las siguientes propiedades para evitar referencias circulares
        CreateMap<Publicacion, PublicacionInputType>()
            .ReverseMap()
            .ForMember(u => u.Autor, pubInput => pubInput.Ignore())
            .ForMember(u => u.Categoria, pubInput => pubInput.Ignore());

        CreateMap<Publicacion, PublicacionPayload>()
            .ReverseMap()
            .ForMember(u => u.Autor, pubInput => pubInput.Ignore())
            .ForMember(u => u.Categoria, pubInput => pubInput.Ignore());
    }
}