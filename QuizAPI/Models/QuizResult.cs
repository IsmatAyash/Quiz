using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class QuizResult
    {
        [Key]
        public int QRID { get; set; }
        [Required]
        [ForeignKey("Question")]
        public int QnID { get; set; }
        [Required]
        public int QuizID { get; set; }
        public string ParticipantID { get; set; }
        [Column(TypeName = "varchar(20)")]
        [Required]
        public string AnsStatus { get; set; }
        public bool Countable { get; set; } = true;
        public Quiz Quiz { get; set; }
        public Participant Participant { get; set; }
        public Question Question { get; set; }
    }
}