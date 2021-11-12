using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
        public class Category
    {
        [Key]
        public int CategoryID { get; set; }
        [Column(TypeName = "varchar(100)")]
        [Required]
        public string CategoryName { get; set; }
    }

}