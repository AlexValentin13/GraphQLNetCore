using GraphQLServer.Models;
using GrpahQLServer.Data;
using Microsoft.EntityFrameworkCore;

namespace GraphQLServer.Data;
public class BlogContextSeed
{
    public static async Task SeedAsync(BlogContext context, ILoggerFactory loggerFactory)
    {
        try
        {
            await context.Database.OpenConnectionAsync();

            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT blog.Categoria ON");
            if (!context.Categorias.Any())
            {

                var categorias = new List<Categoria>()
                {
                    new Categoria(){Id=1, Nombre="Graphql"},
                    new Categoria(){Id=2, Nombre="Desarrollo Web"},
                    new Categoria(){Id=3, Nombre="Restful APIs"},
                    new Categoria(){Id=4, Nombre="NET Core"},
                    new Categoria(){Id=5, Nombre="Blazor"}
                };

                await context.Categorias.AddRangeAsync(categorias);
                await context.SaveChangesAsync();

            }
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT blog.Categoria OFF");

            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT blog.Autor ON");
            if (!context.Autores.Any())
            {

                var autores = new List<Autor>()
                {
                    new Autor(){ Id=1, Nombre="Javier",Apellidos="González",CorreoElectronico="javierglez@correo.com"},
                    new Autor(){ Id=2, Nombre="Janeth",Apellidos="Rosales",CorreoElectronico="jarosales@correo.com"},
                    new Autor(){ Id=3, Nombre="Israel",Apellidos="Jimenez",CorreoElectronico="isjimenez@correo.com"},
                };

                await context.Autores.AddRangeAsync(autores);
                await context.SaveChangesAsync();

            }
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT blog.Autor OFF");


            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT blog.Publicacion ON");
            if (!context.Publicaciones.Any())
            {

                var publicaciones = new List<Publicacion>()
                {
                    new Publicacion()
                    {
                         Id=1,
                         AutorId=1,
                         CategoriaId=1,
                         Estado= EstadoPublicacion.ACTIVA,
                         ImagenUrl="https://picsum.photos/id/1/200/300",
                         Contenido=@"Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                      Phasellus metus enim, ornare nec ante nec, tincidunt 
                                      tristique sapien. Aenean tincidunt sapien at tincidunt congue. 
                                      Nullam vitae posuere nunc. Mauris velit dolor, ornare eu 
                                      pulvinar venenatis, ultrices sit amet est. Integer dapibus 
                                      orci sed mattis fringilla. ",
                         Rating=5,
                         Titulo="Mi primera publicación"
                    },
                    new Publicacion()
                    {
                         Id=2,
                         AutorId=2,
                         CategoriaId=2,
                         Estado= EstadoPublicacion.ACTIVA,
                         ImagenUrl="https://picsum.photos/id/10/200/300",
                         Contenido=@"Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                      Phasellus metus enim, ornare nec ante nec, tincidunt 
                                      tristique sapien. Aenean tincidunt sapien at tincidunt congue. 
                                      Nullam vitae posuere nunc. Mauris velit dolor, ornare eu 
                                      pulvinar venenatis, ultrices sit amet est. Integer dapibus 
                                      orci sed mattis fringilla. ",
                         Rating=4,
                         Titulo="Mi segunda publicación"
                    }
                };

                await context.Publicaciones.AddRangeAsync(publicaciones);
                await context.SaveChangesAsync();
            }
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT blog.Publicacion OFF");

            await context.Database.CloseConnectionAsync();

        }
        catch (Exception ex)
        {
            var logger = loggerFactory.CreateLogger<BlogContextSeed>();
            logger.LogError(ex, "Ocurrió un error durante la inicialización de información de relleno a la Base de Datos.");
        }


    }
}