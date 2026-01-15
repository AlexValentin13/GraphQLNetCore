using GraphQLServer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GrpahQLServer.Data.Configurations;
public class CategoriaConfiguration : IEntityTypeConfiguration<Categoria>
{
    public void Configure(EntityTypeBuilder<Categoria> builder)
    {
        // Configura la tabla
        builder.ToTable("Categoria", "blog"); // Indica que la tabla pertenece al esquema BLOG

        // Configura las propiedades
        builder.Property(u => u.Nombre).IsRequired().HasMaxLength(200);
        builder.HasMany(u => u.Publicaciones).WithOne(u => u.Categoria).HasForeignKey(u => u.CategoriaId);
    }
}
