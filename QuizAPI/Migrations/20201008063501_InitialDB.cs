using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizAPI.Migrations
{
    public partial class InitialDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppSetting",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumberOfQuestions = table.Column<int>(nullable: false),
                    DefaultUserRole = table.Column<string>(nullable: true),
                    UserRoles = table.Column<string>(nullable: true),
                    DaysBetweenQuizes = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppSetting", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    CategoryID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.CategoryID);
                });

            migrationBuilder.CreateTable(
                name: "Participant",
                columns: table => new
                {
                    ParticipantID = table.Column<string>(type: "varchar(20)", nullable: false),
                    Email = table.Column<string>(type: "varchar(100)", nullable: false),
                    FullName = table.Column<string>(type: "varchar(100)", nullable: true),
                    Q1Grade = table.Column<decimal>(type: "decimal(5,3)", nullable: true),
                    Q2Grade = table.Column<decimal>(type: "decimal(5,3)", nullable: true),
                    Q3Grade = table.Column<decimal>(type: "decimal(5,3)", nullable: true),
                    Q4Grade = table.Column<decimal>(type: "decimal(5,3)", nullable: true),
                    LastResetDate = table.Column<DateTime>(nullable: false),
                    UserRole = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participant", x => x.ParticipantID);
                });

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    QnID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Qn = table.Column<string>(type: "nvarchar(MAX)", nullable: false),
                    Option1 = table.Column<string>(type: "nvarchar(MAX)", nullable: false),
                    Option2 = table.Column<string>(type: "nvarchar(MAX)", nullable: false),
                    Option3 = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    Option4 = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    Option5 = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    Answer = table.Column<int>(type: "int", nullable: false),
                    AnswerDescription = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    CategoryID = table.Column<int>(nullable: false),
                    QnTime = table.Column<int>(nullable: false),
                    QnVolatile = table.Column<bool>(nullable: false),
                    Active = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.QnID);
                    table.ForeignKey(
                        name: "FK_Question_Category_CategoryID",
                        column: x => x.CategoryID,
                        principalTable: "Category",
                        principalColumn: "CategoryID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Quiz",
                columns: table => new
                {
                    QuizID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quizdate = table.Column<DateTime>(nullable: false),
                    Score = table.Column<decimal>(type: "decimal(5,3)", nullable: true),
                    TimeSpent = table.Column<int>(nullable: true),
                    ParticipantID = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quiz", x => x.QuizID);
                    table.ForeignKey(
                        name: "FK_Quiz_Participant_ParticipantID",
                        column: x => x.ParticipantID,
                        principalTable: "Participant",
                        principalColumn: "ParticipantID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "QuizResult",
                columns: table => new
                {
                    QRID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QnID = table.Column<int>(nullable: false),
                    QuizID = table.Column<int>(nullable: false),
                    ParticipantID = table.Column<string>(nullable: true),
                    AnsStatus = table.Column<string>(type: "varchar(20)", nullable: false),
                    Countable = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizResult", x => x.QRID);
                    table.ForeignKey(
                        name: "FK_QuizResult_Participant_ParticipantID",
                        column: x => x.ParticipantID,
                        principalTable: "Participant",
                        principalColumn: "ParticipantID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuizResult_Question_QnID",
                        column: x => x.QnID,
                        principalTable: "Question",
                        principalColumn: "QnID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuizResult_Quiz_QuizID",
                        column: x => x.QuizID,
                        principalTable: "Quiz",
                        principalColumn: "QuizID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Question_CategoryID",
                table: "Question",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_Quiz_ParticipantID",
                table: "Quiz",
                column: "ParticipantID");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResult_ParticipantID",
                table: "QuizResult",
                column: "ParticipantID");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResult_QnID",
                table: "QuizResult",
                column: "QnID");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResult_QuizID",
                table: "QuizResult",
                column: "QuizID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppSetting");

            migrationBuilder.DropTable(
                name: "QuizResult");

            migrationBuilder.DropTable(
                name: "Question");

            migrationBuilder.DropTable(
                name: "Quiz");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Participant");
        }
    }
}
