using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
        public class Participant
    {
        [Key]
        [Column(TypeName = "varchar(20)")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string ParticipantID { get; set; }
        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Email { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string FullName { get; set; }
        [Column(TypeName = "decimal(5,3)")]
        public decimal? Q1Grade { get; set; }
        [Column(TypeName = "decimal(5,3)")]
        public decimal? Q2Grade { get; set; }
        [Column(TypeName = "decimal(5,3)")]
        public decimal? Q3Grade { get; set; }
        [Column(TypeName = "decimal(5,3)")]
        public decimal? Q4Grade { get; set; }
        public DateTime LastResetDate { get; set; }
        public string UserRole { get; set; }

        public ICollection<QuizResult> QuizResults { get; set; }
    }

}