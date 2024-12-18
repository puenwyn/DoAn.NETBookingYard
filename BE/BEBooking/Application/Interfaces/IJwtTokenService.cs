﻿using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IJwtTokenService
    {
        string GenerateToken(string username, DateTime expires);
        string VerifyTokenAndGetUsername(string token);
    }
}
