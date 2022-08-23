using System.Reflection;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using TeamLunch.Data;
using Microsoft.OpenApi.Models;

namespace TeamLunch
{
    public class Startup
    {
        public IConfiguration Configuration;
        public IWebHostEnvironment HostingEnvironment;
        private string AllowLocalhost = "_allowLocalhost";

        public Startup(IConfiguration configuration, IWebHostEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            HostingEnvironment = hostingEnvironment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(options =>
                {
                    Configuration.Bind("AzureAdB2C", options);

                    options.TokenValidationParameters.NameClaimType = "name";
                },
                options =>
                {
                    Configuration.Bind("AzureAdB2C", options);
                });

            services.AddControllers();
            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen(config =>
            {
                config.CustomSchemaIds(type => type.ToString());

                config.SwaggerDoc("v1", new OpenApiInfo { Title = "TeamLunch API", Version = "v1" });

                config.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Description = "OAuth2.0 Auth Code with PKCE",
                    Name = "oauth2",
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows
                    {
                        AuthorizationCode = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new Uri(Configuration["Swagger:AuthorizationUrl"]),
                            TokenUrl = new Uri(Configuration["Swagger:TokenUrl"]),
                            Scopes = new Dictionary<string, string>
                            {
                                { Configuration["Swagger:ApiScope"], "read the API" }
                            }
                        }
                    }
                });

                config.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "oauth2" }
                        },
                        new[] { Configuration["Swagger:ApiScope"] }
                    }
                });
            });

            services.AddMediatR(Assembly.GetExecutingAssembly());

            services.AddDbContext<DataContext>(options => options.UseInMemoryDatabase("TeamLunch"));

            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowLocalhost, policy =>
                {
                    policy
                        .WithOrigins("http://localhost:3000", "https://thankful-sand-0a1eb4203.1.azurestaticapps.net")
                        .AllowAnyHeader();
                });
            });
        }

        public virtual void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext context)
        {
            SeedInMemoryDatabase(app.ApplicationServices);

            app.UseSwagger();

            app.UseSwaggerUI(config =>
            {
                config.OAuthClientId(Configuration["Swagger:ClientId"]);
                config.OAuthUsePkce();
                config.OAuthScopeSeparator(" ");
            });

            app.UseRouting();

            app.UseHttpsRedirection();

            app.UseCors(AllowLocalhost);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void SeedInMemoryDatabase(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<DataContext>();
            db.Database.EnsureCreated();
        }
    }
}