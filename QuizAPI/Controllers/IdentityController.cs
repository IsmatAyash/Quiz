using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizAPI.Helpers;
using System.Security.Principal;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class IdentityController : ControllerBase
    {
        private IUserProvider provider;

        public IdentityController(IUserProvider provider)
        {
            this.provider = provider;
        }

        [HttpGet]
        public AdUser GetCurrentUser() => provider.CurrentUser;
    }
}