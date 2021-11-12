using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
       public class Question
    {
        [Key]
        public int QnID { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string ImageName { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(MAX)")]
        public string Qn { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(MAX)")]
        public string Option1 { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(MAX)")]
        public string Option2 { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string Option3 { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string Option4 { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string Option5 { get; set; }
        [Required]
        [Column(TypeName = "int")]
        public int? Answer { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string AnswerDescription { get; set; }
        public int CategoryID { get; set; }
        [ForeignKey("CategoryID")]
        public Category Category { get; set; }
        public int QnTime { get; set; } = 0;
        public bool QnVolatile { get; set; }
        public bool Active { get; set; } = true;
    }
}