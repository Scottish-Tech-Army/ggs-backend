using System.Security.Claims;

namespace GGS.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetCode(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }
    }
}