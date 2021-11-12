using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Models
{
    public class QuizContext : DbContext
    {
        public QuizContext(DbContextOptions<QuizContext> options) : base(options)
        {
        }

        public DbSet<Participant> Participants { get; set; }
        public DbSet<QuizResult> QuizResults { get; set; }
        public DbSet<Quiz> Quizes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<AppSetting> AppSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Quiz>().ToTable("Quiz");
            modelBuilder.Entity<QuizResult>().ToTable("QuizResult");
            modelBuilder.Entity<Participant>().ToTable("Participant");
            modelBuilder.Entity<Question>().ToTable("Question");
            modelBuilder.Entity<Category>().ToTable("Category");
            modelBuilder.Entity<AppSetting>().ToTable("AppSetting");

            modelBuilder.Entity<QuizResult>()
                .HasOne(p => p.Participant)
                .WithMany(qr => qr.QuizResults)
                .HasForeignKey(p => p.ParticipantID)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
