using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ParticipantController : ControllerBase
    {
        private readonly QuizContext _context;

        public ParticipantController(QuizContext context)
        {
            _context = context;
        }

        // GET: api/Participant
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Participant>>> GetParticipants()
        {
            return await _context.Participants.ToListAsync();
        }

        //GET: api/Participant/5
        [HttpGet("{id}")]

        public async Task<ActionResult> GetParticipant(string id)
        {
            if (id == "")
            {
                return NoContent();
            }

            var participant = await _context.Participants
                .Include(q => q.QuizResults)
                .ThenInclude(q => q.Quiz)
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.ParticipantID == id);

            if (participant == null)
            {
                return NoContent();
            }

            return Ok(participant);
        }

        // PUT: api/Participant/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParticipant(string id, Participant participant)
        {
            if (id != participant.ParticipantID)
            {
                return BadRequest();
            }

            _context.Entry(participant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParticipantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Participant/5
        [HttpDelete("{id}")]
        public ActionResult DeleteParticipant(string id)
        {
            // deletes participant and related records on quizes and quiz results tables
            // cascade delete on defined in QuizContext.cs file
            var qzNos = _context.QuizResults.Where(q => q.ParticipantID == id).GroupBy(q => q.QuizID).Select(g => g.Key).ToList();
            var participant = _context.Participants
                              .Include(q => q.QuizResults)
                              .Where(p => p.ParticipantID == id)
                              .SingleOrDefault();

            var quizes = _context.Quizes.Where(q => qzNos.Contains(q.QuizID));


            if (participant == null)
            {
                return NotFound();
            }
            
            try
            {
                _context.Participants.Remove(participant);
                _context.Quizes.RemoveRange(quizes);
                _context.SaveChanges();
                return Ok(true);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        private bool ParticipantExists(string id)
        {
            return _context.Participants.Any(e => e.ParticipantID == id);
        }

    }
}
