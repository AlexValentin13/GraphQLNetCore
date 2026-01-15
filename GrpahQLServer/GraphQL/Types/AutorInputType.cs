using GraphQLServer.Models;

namespace GrpahQLServer.GraphQL.Types;

public class AutorInputType
{
    public string Nombre { get; set; } = null!;
    public string Apellidos { get; set; } = null!;
    public string CorreoElectronico { get; set; } = null!;
    public decimal Salario { get; set; }
}
