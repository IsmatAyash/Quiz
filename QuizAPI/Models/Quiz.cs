using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace QuizAPI.Models
{
        public class Quiz
    {
        [Key]
        public int QuizID { get; set; }
        public DateTime Quizdate { get; set; }
        [Column(TypeName = "decimal(5,3)")]
        public decimal? Score { get; set; }
        public int? TimeSpent { get; set; }
        public string ParticipantID { get; set; }
        public Participant Participant { get; set; }
        public ICollection<QuizResult> QuizResults { get; set; }
    }
}