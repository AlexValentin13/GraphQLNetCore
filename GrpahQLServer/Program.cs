using GrpahQLServer.Data;
using GrpahQLServer.GraphQL.Autores;
using GrpahQLServer.GraphQL.Publicaciones;
using GrpahQLServer.MethodExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

// Esto permite agregar el Mapper al contenedor de Servicios, y permitirá agregar todas las
// clases que hereden de Profile dentro del ensamblado principal
builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());

// Se agrega GraphQL al contenedor
builder.Services
    .AddGraphQLServer()

    // Al agregar estos dos elementos sin describir el tipo o sin pasar un parámetro, se tomaran aquellos elementos que se llamen Query o Mutation
    .AddQueryType() // Agrega todas las Queries a GraphQL
    .AddMutationType() // Agrega todas las Mutations a GraphQL

    // Con esta funcionalidad, ya no es necesario agregar las extensiones (lineas de abajo)
    //.AddServidorGraphQLTypes() //Se usa ModuleInfo.cs para el nombre
    .AddGrpahQLServerTypes() // Se usa el nombre default
    //.AddTypeExtension<PublicacionesQueries>()
    //.AddTypeExtension<AutoresQueries>()
    //.AddTypeExtension<PublicacionesMutations>()
    //.AddTypeExtension<AutoresMutations>()

    //.RegisterDbContext<BlogContext>() // Al parecer para esta versión no es necesario registrar el contexto en GraphQL
    .AddProjections() // Habilita proyecciones para retornar solo campos especificados dentro del query
    .AddFiltering() // Habilita el uso de filtros
    .AddSorting() // Habilita el uso de características para ordenar los resultados con base a atributos
    ;

// Declaración del contexto para la base de datos
builder.Services
    .AddDbContext<BlogContext>(
        options => options.UseSqlServer(builder.Configuration.GetConnectionString("BlogConnection"),
                x => x.MigrationsHistoryTable(HistoryRepository.DefaultTableName, "blog")
        )
    );

var app = builder.Build();

// Se realiza la migraicón de la DB (sincronización)
await app.ConfigurarMigraciones();

app.UseCors(c => c.AllowAnyHeader().WithMethods("POST").AllowAnyOrigin());

// Se hace el mapeo de GraphQL. Esto generará que la ruta por defecto sea: .../graphql
app.MapGraphQL();

app.MapGet("/", () => "Hello World!");
app.Run();