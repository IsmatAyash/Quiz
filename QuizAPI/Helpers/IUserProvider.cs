using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace QuizAPI.Helpers
{
    public interface IUserProvider
    {
        AdUser CurrentUser { get; set; }
        bool Initialized { get; set; }
        Task Create(HttpContext context, IConfiguration config); 
        Task<AdUser> GetAdUser(IIdentity identity);
    }
}
