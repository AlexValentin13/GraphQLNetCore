using GrpahQLServer.Data;
using GrpahQLServer.GraphQL;
using GrpahQLServer.MethodExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Esto permite agregar el Mapper al contenedor de Servicios, y permitirá agregar todas las
// clases que hereden de Profile dentro del ensamblado principal
builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());

// Se agrega GraphQL al contenedor
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>() // Se agrega Query a GraphQL
    .AddMutationType<Mutation>()
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

// Se hace el mapeo de GraphQL. Esto generará que la ruta por defecto sea: .../graphql
app.MapGraphQL();

app.MapGet("/", () => "Hello World!");
app.Run();