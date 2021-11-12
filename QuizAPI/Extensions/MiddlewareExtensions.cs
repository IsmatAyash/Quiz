using Microsoft.AspNetCore.Builder;
using QuizAPI.Helpers;

namespace QuizAPI.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseAdMiddleware(this IApplicationBuilder builder) =>
            builder.UseMiddleware<AdUserMiddleware>();

        public static IApplicationBuilder UseCorsMiddleware(this IApplicationBuilder builder) =>
            builder.UseMiddleware<CorsMiddleware>();
    }
}
