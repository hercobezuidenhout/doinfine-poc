using System.Reflection;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using TeamLunch.Data;
using Microsoft.OpenApi.Models;
using TeamLunch.Hubs;
using TeamLunch.Contracts;
using TeamLunch.Services;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using TeamLunch.Extensions;

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

        private NpgsqlConnectionStringBuilder NpgsqlConnectionString()
        {
            var connectionString = new NpgsqlConnectionStringBuilder()
            {
                SslMode = SslMode.Disable,
                Host = "172.17.0.1",
                Username = "postgres",
                Password = "DKan]V8S_<Rl:=ad",
                Database = "doinfine-db"
            };
            connectionString.Pooling = true;
            return connectionString;
        }

        public void ConfigureServices(IServiceCollection services)
        {

            var projectId = Environment.GetEnvironmentVariable("DF_ENVIRONMENT") == "Production" ? "doin-fine" : "doinfine-test";
            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = $"https://securetoken.google.com/doin-fine";
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = $"https://securetoken.google.com/doin-fine",
                        ValidateAudience = true,
                        ValidAudience = "doin-fine",
                        ValidateLifetime = true
                    };
                });

            services.AddControllers();
            services.AddEndpointsApiExplorer();

            services.AddMediatR(Assembly.GetExecutingAssembly());

            services.AddDbContext<DataContext>(options =>
            {
                options.UseNpgsql(NpgsqlConnectionString().ConnectionString);
                // if (Environment.GetEnvironmentVariable("DF_ENVIRONMENT") == "Production")
                // {
                // }
                // else
                // {
                //     options.UseInMemoryDatabase("DoinFineDb");
                // }
            });

            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowLocalhost, policy =>
                {
                    policy
                        .WithOrigins("http://localhost:3000", "https://doinfine.app", "https://test.doinfine.app", "https://doinfine-test.web.app")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            services.AddSignalR();
            services.AddScoped<INotificationService, NotificationService>();
            services.AddEmailService();
        }

        public virtual void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext context)
        {

            // if (Environment.GetEnvironmentVariable("DF_ENVIRONMENT") != "Production")
            // {
            //     context.Database.EnsureCreated();
            // }

            app.UseRouting();

            app.UseHttpsRedirection();

            app.UseCors(AllowLocalhost);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotificationsHub>("/hubs/notifications");
            });

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
    }
}
