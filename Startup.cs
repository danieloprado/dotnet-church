using ChurchWeb.Context;
using ChurchWeb.Providers;
using ChurchWeb.Providers.Interfaces;
using ChurchWeb.ViewModels;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Services;
using Services.Interfaces;

namespace ChurchWeb
{
    public class Startup
    {
        private readonly IConfigurationRoot _configuration;

        public Startup(IHostingEnvironment env)
        {
            System.Console.WriteLine(env.ContentRootPath);

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

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEntityFrameworkNpgsql()
                .AddDbContext<ChurchDbContext>(options =>
                {
                    options.UseNpgsql(_configuration["Data:DefaultConnection:ConnectionString"]);
                });

            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            services.Configure<Config.AppSettings>(options => _configuration.GetSection("Settings").Bind(options));
            services.AddTransient<ITokenGenerator, TokenGenerator>();
            services.AddTransient<IUserService, UserService>();
            services.AddScoped<UserToken>(UserTokenProvider.Resolve);

            services.AddScoped<TokenAuthorize>();
        }
    }
}