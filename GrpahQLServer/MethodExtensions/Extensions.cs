using GraphQLServer.Data;
using GrpahQLServer.Data;
using Microsoft.EntityFrameworkCore;

namespace GrpahQLServer.MethodExtensions;
public static class Extensions
{
    // Este es un método de extension de WebApplication.
    // El método permite ejecutar las migraciones que hayan pendientes usando MigrateAsync().
    // Se debe llamar desde Program.cs

    public static async Task ConfigurarMigraciones(this WebApplication app) {
        var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        var loggerFactory = services.GetRequiredService<ILoggerFactory>();

        try
        {
            var context = services.GetRequiredService<BlogContext>();
            await context.Database.MigrateAsync();

            // Se agregan datos demo a las tablas previamente creadas
            await BlogContextSeed.SeedAsync(context, loggerFactory);
        }
        catch (Exception ex) {
            var logger = loggerFactory.CreateLogger<Program>();
            logger.LogError(ex, "Ocurrió un error durante la migración");
        }
    }
}