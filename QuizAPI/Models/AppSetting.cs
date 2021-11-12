
using System.ComponentModel.DataAnnotations;

namespace QuizAPI.Models
{
    public class AppSetting
    {
        [Key]
        public int Id { get; set; }
        public int NumberOfQuestions { get; set; }
        public string DefaultUserRole { get; set; }
        public string UserRoles { get; set; }
        public int DaysBetweenQuizes { get; set; }
    }
}
