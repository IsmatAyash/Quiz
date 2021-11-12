using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
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
    public class QuestionController : ControllerBase
    {
        private readonly QuizContext _context;

        public QuestionController(QuizContext context)
        {
            _context = context;
        }

        // GET: api/Question
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            return await _context.Questions.Include("Category").ToListAsync();
        }

        // GET: api/Question/5
        [HttpGet("{id}")]
        public ActionResult<Question> GetQuestion(int id)
        {
            var question = _context.Questions.Include(c => c.Category).FirstOrDefault(q => q.QnID == id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        // PUT: api/Question/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutQuestion(int id, Question question)
        {
            if (id != question.QnID)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
                question = _context.Questions.Include(c => c.Category).FirstOrDefault(q => q.QnID == id);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(question);
        }

        // POST: api/Question
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<Question> PostQuestion(Question question)
        {
            _context.Questions.Add(question);
            _context.SaveChanges();
            question = _context.Questions.Include(c => c.Category).FirstOrDefault(q => q.QnID == question.QnID);

            return question;
        }

        // POST: api/Question/UploadImage
        [HttpPost, DisableRequestSizeLimit]
        [Route("upload")]
        public IActionResult UploadImage()
        {
            try
            {
                var image = Request.Form.Files[0];
                var imageToSave = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                if (image.Length > 0)
                {
                    var imageName = ContentDispositionHeaderValue.Parse(image.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(imageToSave, imageName);
                    var dbPath = Path.Combine("Images", imageName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        image.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        // DELETE: api/Question/5
        [HttpDelete("{id}")]
        public ActionResult<bool> DeleteQuestion(int id)
        {
            var question = _context.Questions.FirstOrDefault(q => q.QnID == id);
            var quizresults = _context.QuizResults.Where(q => q.QnID == id);

            if (quizresults == null)
            {
                _context.Questions.Remove(question);
                _context.SaveChanges();

                return true;
            }

            return false;
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.QnID == id);
        }
    }
}
