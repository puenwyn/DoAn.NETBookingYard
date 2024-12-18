using Application.Interfaces;
using Domain.Entities;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class GoogleAuthService : IGoogleAuthService
    {
        private readonly string _clientId;
        private readonly string _clientSecret;
        public GoogleAuthService(IConfiguration configuration)
        {
            _clientId = configuration["GoogleAPI:ClientId"];
            _clientSecret = configuration["GoogleAPI:ClientSecret"];
        }
        public async Task<User> GetUserInfoFromGoogleAsync(string token)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(token, new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { _clientId }
                });
                var user = new User
                {
                    Email = payload.Email,
                    FullName = payload.Name,
                };
                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Error while retrieving Google user information.", ex);
            }
        }
    }
}
