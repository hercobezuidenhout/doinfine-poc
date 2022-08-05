using System.Reflection;
using TeamLunch.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(Assembly.GetExecutingAssembly());

builder.Services.AddDbContext<DataContext>(options => options.UseInMemoryDatabase("Corporate"));

var AllowedOrigins = "_allowedOrigins";
builder.Services.AddCors(options => {
    options.AddPolicy(name: AllowedOrigins, policy => {
        policy.WithOrigins("http://localhost:3000", "https://thankful-sand-0a1eb4203.1.azurestaticapps.net");
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DataContext>();
    db.Database.EnsureCreated();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors(AllowedOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
