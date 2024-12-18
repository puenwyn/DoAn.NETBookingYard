using Application.BackgroundServices;
using Application.Interfaces;
using Application.Services;
using DataAccess.DataAccess;
using DataAccess.Repository;
using Domain.Abstract;
using Domain.Entities;
using Domain.Setting;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Configuration
{
    public static class ConfigurationDbAccess
    {
        public static void Configure(this IServiceCollection services, IConfiguration configuration)
        {
            services.RegisterDbContext(configuration);
            services.RegisterAuthentication(configuration);
            services.RegisterIdentity();
        }

        public static void RegisterDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection String 'DefaultConnection' not found");
            services.AddDbContext<BookingDbContext>(options => options.UseSqlServer(connectionString));
        }
        public static void RegisterAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                    .AddCookie(options =>
                    {
                        options.LoginPath = "/api/v1/Auth/login";
                        options.LogoutPath = "/api/v1/Auth/logout";
                    });
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = false,
                            ValidateAudience = false,
                            ValidateLifetime = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:SecretKey"])) // Chìa khóa bảo mật cho token
                        };
                    });
        }
        public static void RegisterIdentity(this IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;         // không yêu cầu có ít nhất 1 chữ số
                options.Password.RequireLowercase = false;    // yêu cầu có ít nhất 1 chữ cái viết thường
                options.Password.RequireUppercase = false;   // không yêu cầu chữ cái viết hoa
                options.Password.RequireNonAlphanumeric = false; // không yêu cầu ký tự đặc biệt
                options.Password.RequiredLength = 6;          // độ dài tối thiểu của mật khẩu
            })
                    .AddEntityFrameworkStores<BookingDbContext>()
                    .AddDefaultTokenProviders();
        }

        public static void AddDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<MomoConfig>(configuration.GetSection("MoMoConfig"));
            services.AddTransient<PasswordHasher<User>>();
            // Repositories
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            // Services
            services.AddTransient<IYardService, YardService>();
            services.AddTransient<IOwnerService, OwnerService>();
            services.AddTransient<IAmenityService, AmenityService>();
            services.AddTransient<IYardTypeService, YardTypeService>();
            services.AddTransient<IYardImageService, YardImageService>();
            services.AddTransient<IYardDetailService, YardDetailService>();
            services.AddTransient<IVoucherService, VoucherService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ISendEmailService, SendEmailService>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<IBookingService, BookingService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IJwtTokenService, JwtTokenService>();
            services.AddTransient<IPaymentService, PaymentService>();
            services.AddTransient<IGoogleAuthService, GoogleAuthService>();
            services.AddSingleton<CleanExpiredBookingsService>();
            services.AddHostedService<CleanExpiredBookingsService>();
            // Session
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromDays(1);
                options.Cookie.HttpOnly = true;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.IsEssential = true;
            });
            services.ConfigureApplicationCookie(options =>
            {
                options.ExpireTimeSpan = TimeSpan.FromDays(1);
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Cookie.SameSite = SameSiteMode.None;
            });
            services.AddRazorPages();
            services.AddHttpClient();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddMvc();
        }

        public static void AddConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowLocalhost3000", policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials();
                });
            });
        }
    }
}
