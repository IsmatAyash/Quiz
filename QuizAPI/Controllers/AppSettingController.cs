using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AppSettingController : ControllerBase
    {
        private readonly QuizContext _context;

        public AppSettingController(QuizContext context)
        {
            _context = context;
        }

        // GET: api/AppSetting
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppSetting>>> GetAppSettings()
        {
            return await _context.AppSettings.ToListAsync();
        }

        // GET: api/AppSetting/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AppSetting>> GetAppSetting(int id)
        {
            var appSetting = await _context.AppSettings.FindAsync(id);

            if (appSetting == null)
            {
                return NotFound();
            }

            return appSetting;
        }

        // PUT: api/AppSetting/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppSetting(int id, AppSetting appSetting)
        {
            if (id != appSetting.Id)
            {
                return BadRequest();
            }

            _context.Entry(appSetting).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }
    }
}
