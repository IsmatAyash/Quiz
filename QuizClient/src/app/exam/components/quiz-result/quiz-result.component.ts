import { SnackBarService } from "shared/services/snack-bar.service";
import { QuizService } from "shared/services/quiz.service";
import { Component, OnInit } from "@angular/core";
import { UserService } from "shared/services/user.service";

@Component({
  selector: "app-quiz-result",
  templateUrl: "./quiz-result.component.html",
  styles: [],
})
export class QuizResultComponent implements OnInit {
  quizGrade = 0;

  formatSubtitle = (percent: number) => "Grade";

  constructor(
    public quizService: QuizService,
    public userService: UserService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.quizService.getAnswers().subscribe((data: any) => {
      this.quizService.correctAnswerCount = 0;
      this.quizService.qns.forEach((e, i) => {
        if (e.answer === data[i].Answer) this.quizService.correctAnswerCount++;
        e.correct = data[i].Answer;
      });
      this.quizGrade =
        (this.quizService.correctAnswerCount / this.quizService.qns.length) *
        100;
      this.postData();
    });
  }

  private postData() {
    this.quizService
      .updateQuiz(this.quizService.qzID)
      .subscribe((data: any) => {
        this.snackBarService.openSnackBar(
          "Submitted Successfully!!",
          "success"
        );
      });
  }
}
