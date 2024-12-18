using DataAccess.DataAccess;
using Domain.Entities;
using Domain.Setting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public static class ConfigurationService
    {
        public static async Task AutoMigration(this WebApplication webApplication)
        {
            using (var scope = webApplication.Services.CreateScope())
            {
                var app = scope.ServiceProvider.GetRequiredService<BookingDbContext>();
                await app.Database.EnsureCreatedAsync();  // Phương thức bất đồng bộ
                await app.Database.MigrateAsync();      // Phương thức bất đồng bộ
            }
        }

        public static async Task SeedData(this WebApplication webApplication, IConfiguration configuration)
        {
            using (var scope = webApplication.Services.CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                var defaultUser = configuration.GetSection("DefaultUsers")?.Get<DefaultUser>() ?? new DefaultUser();
                var defaultRole = configuration.GetValue<string>("DefaultRole") ?? "SuperAdmin";
                var customerRole = "Customer";
                try
                {
                    if (!await roleManager.RoleExistsAsync(defaultRole))
                    {
                        await roleManager.CreateAsync(new IdentityRole(defaultRole));
                    }
                    if (!await roleManager.RoleExistsAsync(customerRole))
                    {
                        await roleManager.CreateAsync(new IdentityRole(customerRole));
                    }
                    var existUser = await userManager.FindByNameAsync(defaultUser.Username);
                    if (existUser == null)
                    {
                        var user = new User
                        {
                            UserName = defaultUser.Username,
                            FullName = defaultUser.Username,
                            Email = defaultUser.Email,
                            NormalizedEmail = defaultUser.Email.ToUpper(),
                            AccessFailedCount = 0
                        };

                        var identityUser = await userManager.CreateAsync(user, defaultUser.Password);

                        if (identityUser.Succeeded)
                        {
                            await userManager.AddToRoleAsync(user, defaultRole);
                        }
                    }
                }
                catch (Exception)
                {
                    throw;
                }

            }
        }
    }
}
