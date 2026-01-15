using GraphQLServer.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace GrpahQLServer.Data;

// La definición de esta clase de contexto. Para poder usarla se debe definir en el contenedor de servicios Program.cs
public class BlogContext : DbContext
{
    // Este constructor permitirá hacer uso de la cadena de conexión del archivo Program.cs
    public BlogContext(DbContextOptions options) : base(options) { }

    public DbSet<Autor> Autores { get; set; } = default!;
    public DbSet<Categoria> Categorias { get; set; } = default!;
    public DbSet<Publicacion> Publicaciones { get; set; } = default!;


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Con esta línea se aplica la configuración de todas las instancias que implementen IEntityTypeConfiguration
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(modelBuilder);
    }
}