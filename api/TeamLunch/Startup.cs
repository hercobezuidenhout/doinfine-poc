using System.Reflection;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TeamLunch.Data;

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
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddMediatR(Assembly.GetExecutingAssembly());

            services.AddDbContext<DataContext>(options => options.UseInMemoryDatabase("Corporate"));

            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowLocalhost, policy =>
                {
                    policy.WithOrigins("http://localhost:3000");
                });
            });
        }

        public virtual void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext context)
        {
            SeedInMemoryDatabase(app.ApplicationServices);

            app.UseSwagger();

            app.UseSwaggerUI();

            app.UseRouting();

            app.UseHttpsRedirection();

            app.UseCors(AllowLocalhost);

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