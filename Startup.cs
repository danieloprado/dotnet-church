using AutoMapper;
using ChurchWeb.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using System.IO;

namespace ChurchWeb
{
    public class Startup
    {
        private readonly IConfigurationRoot _configuration;

        public Startup(IHostingEnvironment env)
        {
            _configuration = new ConfigurationBuilder()
               .SetBasePath(env.ContentRootPath)
               .AddJsonFile("appsettings.json", false, true)
               .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true)
               .AddEnvironmentVariables()
               .Build();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(_configuration.GetSection("Logging"));
            loggerFactory.AddDebug();


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                UpdateDatabase(app);
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseDirectoryBrowser();

            app.UseMvc(routes =>
            {
                routes.MapRoute("default", "api/{controller=Resource}/{action=Index}/{id?}");
            });

            app.MapWhen(config =>
            {
                return !config.Request.Path.Value.Contains(".") && !config.Request.Path.Value.Contains("/api");
            }, branch =>
            {
                branch.Run(async context =>
                {
                    System.Console.WriteLine(context.Request.Path);

                    var content = File.ReadAllText($"{env.ContentRootPath}/wwwroot/index.html");
                    await context.Response.WriteAsync(content);
                });
            });
        }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEntityFrameworkNpgsql().AddDbContext<ChurchDbContext>(options =>
            {
                options.UseNpgsql(_configuration["Data:DefaultConnection:ConnectionString"]);
            });

            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.Configure<Config.AppSettings>(options => _configuration.GetSection("Settings").Bind(options));

            ChurchWeb.Services.Config.DependencyInjection(services);
            ChurchWeb.Data.Config.DependencyInjection(services);

            Mapper.Initialize(config =>
            {
                ChurchWeb.Api.Config.Mapper(config);
                ChurchWeb.Services.Config.Mapper(config);
            });
        }

        private void UpdateDatabase(IApplicationBuilder app)
        {
            var serviceFactory = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
            using (var serviceScope = serviceFactory.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ChurchDbContext>();
                context.Database.Migrate();
            }
        }
    }
}