using GraphQLServer.Models;

namespace GrpahQLServer.GraphQL.Types;

public class AutorPayload
{
    public int Id { get; set; }
    public string Nombre { get; set; } = null!;
    public string Apellidos { get; set; } = null!;
    public string CorreoElectronico { get; set; } = null!;
    public decimal Salario { get; set; }
}