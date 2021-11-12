using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly QuizContext _context;

        public QuizController(QuizContext context)
        {
            _context = context;
        }

        // GET: api/Quiz
        [HttpGet]
        [Route("api/Grades")]
        public ActionResult GetGrades()
        {
            var QuizData = (from p in _context.Participants
                            join qr in _context.QuizResults on p.ParticipantID equals qr.ParticipantID
                            join q in _context.Quizes on qr.QuizID equals q.QuizID
                            where q.Quizdate.Year == DateTime.Now.Year
                            select (new
                            {
                                p.FullName,
                                q.Score,
                                Qtr = q.Quizdate.Month <= 3 ? "Qtr1"
                                    : q.Quizdate.Month <= 6 ? "Qtr2"
                                    : q.Quizdate.Month <= 9 ? "Qtr3"
                                    : q.Quizdate.Month <= 11 ? "Qtr4"
                                    : ""
                            }));
            var scores = QuizData.GroupBy(x => new { x.FullName, x.Qtr })
                                 .Select(y => new
                                 {
                                     y.Key.FullName,
                                     y.Key.Qtr,
                                     Score = y.Average(s => s.Score)
                                 }).OrderBy(f => f.FullName);
            return Ok(scores);
        }


        // GET: api/Quiz/osmat
        [HttpGet("{id}")]
        [Route("api/Quiz/{id}")]
        public ActionResult GetQuiz(string id)
        {
            var winUser = HttpContext.User.Identity.Name;
            string user = id ?? winUser.Substring(winUser.IndexOf(@"\") + 1).ToLower();
            int NOQ = _context.AppSettings.FirstOrDefault().NumberOfQuestions;

            var QnTakenCount = _context.QuizResults.Count(p => p.ParticipantID == user && p.Countable);
            // finish all available questions a new round should be initiated by setting Countable to false in QuizResults for the specific user
            if (_context.Questions.Count() <= QnTakenCount)
            {
                return NoContent();
            }

            // exclude questions taken
            var QnsTaken = _context.QuizResults
                          .Where(r => r.ParticipantID == user && r.Countable)
                          .GroupBy(g => g.QnID)
                          .Select(y => y.Key)
                          .ToArray();

            // take a given number of questions at random from the questions table
            var Qns = _context.Questions
                .Where(q => !QnsTaken.Contains(q.QnID) && q.Active)
                .Select(x => new { x.QnID, x.Qn, x.ImageName, x.Option1, x.Option2, x.Option3, x.Option4, x.Option5, x.QnTime, x.AnswerDescription })
                .OrderBy(y => Guid.NewGuid())
                .Take(NOQ)
                .ToArray();

            // to set the answers' options in an array
            var randQns = Qns.AsEnumerable()
                .Select(x => new
                {
                    x.QnID,
                    x.Qn,
                    x.ImageName,
                    x.QnTime,
                    x.AnswerDescription,
                    Options = new string[] { x.Option1, x.Option2, x.Option3, x.Option4, x.Option5 }
                }).ToList();
            return Ok(randQns);
        }


        // POST api/Answers
        [HttpPost]
        [Route("api/Answers")]
        public ActionResult GetAnswers(int[] qIDs)
        {
            var result = _context.Questions
                        .AsEnumerable()
                        .Where(y => qIDs.Contains(y.QnID) && y.Active)
                        .OrderBy(x => { return Array.IndexOf(qIDs, x.QnID); })
                        .Select(z => new
                        {
                            z.Answer
                        })
                        .ToList();
            return Ok(result);
        }

        // GET api/Grades?pid=name
        [HttpPost]
        [Route("api/Grades")]
        public ActionResult GetGrades(string pid)
        {
            //var qzIds = _context.QuizResults
            //                    .Where(q => q.ParticipantID == pid)
            //                    .Select(q => q.QuizID)
            //                    .Distinct()
            //                    .ToArray();
            var grades = _context.Quizes
                        .AsEnumerable()
                        .Where(y => y.ParticipantID == pid && y.Quizdate.Year == DateTime.Now.Year)
                        .OrderBy(x => x.Quizdate)
                        .Select(g => new
                        {
                            date = g.Quizdate.Date,
                            qtr = g.Quizdate.Date.Month <= 3 ? "Qtr1" :
                                  g.Quizdate.Date.Month <= 6 ? "Qtr2" :
                                  g.Quizdate.Date.Month <= 9 ? "Qtr3" : "Qtr4",
                            score = g.Score,
                            timespent = g.TimeSpent,
                            status = g.Score < 0.6M ? "Fail" : "Pass"
                        })
                        .ToList();
            return Ok(grades);
        }

        [HttpPost]
        [Route("api/Quiz")]
        public async Task<ActionResult<Quiz>> PostQuiz(Quiz quiz)
        {
            try
            {
                _context.Quizes.Add(quiz);
                await _context.SaveChangesAsync();

                return Ok(quiz);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut("{id}")]
        [Route("api/QuizResult/{id}")]
        public async Task<ActionResult<Quiz>> PutQuiz(int id, Quiz quiz)
        {
            if (id != quiz.QuizID)
            {
                return BadRequest();
            }
            _context.Entry(quiz).State = EntityState.Modified;

            try
            {
                //QuizResult table
                foreach (var qz in quiz.QuizResults)
                {
                    if (qz.QRID == 0)
                        _context.QuizResults.Add(qz);
                    else
                        _context.Entry(qz).State = EntityState.Modified;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok(quiz);
        }

        //UPDATE api/Reset? pid = name
        [HttpPost]
        [Route("api/Reset")]
        public ActionResult ResetQn(string pid)
        {
            try
            {
                if (pid == null)
                {
                    return NotFound();
                }

                var qzresults = _context.QuizResults.Where(p => p.ParticipantID == pid);
                if (qzresults.Count(r => !r.Countable) != 0)
                {
                    return NoContent();
                }

                foreach (var qn in qzresults)
                {
                    qn.Countable = false;
                    _context.Entry(qn).State = EntityState.Modified;
                }

                 _context.SaveChanges();
                return Ok(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}