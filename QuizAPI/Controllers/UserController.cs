using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly QuizContext _context;
        private readonly string defaultUserRole;

        public UserController(QuizContext context)
        {
            _context = context;
            this.defaultUserRole = _context.AppSettings.FirstOrDefault().DefaultUserRole;
        }

        // GET api/user
        [HttpGet]
        public ActionResult<Participant> GetUserInfo()
        {

            var domainUser = HttpContext.User.Identity.Name;
            if (domainUser == null)
            {
                return NoContent();
            }
            var winUser = domainUser.Substring(domainUser.IndexOf(@"\") + 1);

            Participant participant = _context.Participants
                .AsNoTracking()
                .FirstOrDefault(m => m.ParticipantID == winUser);

            if (participant == null)
            {
                participant = new Participant
                {
                    ParticipantID = winUser,
                    FullName = "",
                    Email = "",
                    UserRole = this.defaultUserRole
                };
            }

            return Ok(participant);
        }

        // GET api/user/osmat
        [HttpGet("{id}")]
        public ActionResult QuizTaken(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return NotFound();
            }

            int daysTonextqz = _context.AppSettings.FirstOrDefault(d => d.Id == 1 ).DaysBetweenQuizes;

            //var qz = _context.QuizResults
            //    .Include(q => q.Quiz)
            //    .OrderByDescending(d => d.Quiz.QuizID)
            //    .FirstOrDefault(x => x.ParticipantID == id);

            var qz = _context.Quizes.OrderByDescending(d => d.QuizID).FirstOrDefault(x => x.ParticipantID == id);

            if (qz == null)
                return Ok(new { qzDate = DateTime.Now.Date, nextDate = DateTime.Now.Date, canTake = true });

            DateTime nextdate = qz.Quizdate.AddDays(daysTonextqz);

            return Ok(new { qzDate = qz.Quizdate.Date, nextDate = nextdate.Date, canTake = DateTime.Now.Date >= nextdate.Date });
        }


        // POST api/user
        [HttpPost]
        public async Task<ActionResult<Participant>> PostParticipant(Participant participant)
        {
            if (!UserExists(participant.ParticipantID))
            {
                participant.UserRole = participant.ParticipantID.ToLower() == "osmat" ? "Admin" : this.defaultUserRole;
                _context.Participants.Add(participant);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(GetUserInfo), participant);
        }

        private bool UserExists(string id)
        {
            return _context.Participants.Any(e => e.ParticipantID == id);
        }

    }
}