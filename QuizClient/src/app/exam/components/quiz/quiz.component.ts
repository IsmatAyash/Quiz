import { AppSettingService } from "shared/services/app-setting.service";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { QuizService } from "shared/services/quiz.service";
import { SnackBarService } from "shared/services/snack-bar.service";
import { UserService } from "shared/services/user.service";
import { Quiz } from "./../../../shared/Models/quiz.interface";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styles: [],
})
export class QuizComponent implements OnInit {
  isPrev = true;
  nextButton = "Next";
  selectedOptionValue: number;
  CanTake: Observable<boolean> = of(false);
  userName = JSON.parse(sessionStorage.getItem("username")) || null;

  constructor(
    public quizService: QuizService,
    private userService: UserService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.userName)
      this.snackBarService.openSnackBar(
        "User is not logged in please refresh",
        "warn"
      );
    else
      this.userService.quizTaken().subscribe(
        (qz) => {
          this.CanTake = of(qz.canTake);
          if (qz.canTake)
            this.quizService.insertQuiz().subscribe((q: Quiz) => {
              this.quizService.qzID = q.QuizID;
              this.takeQuiz();
            });
          else {
            const msg =
              "Quiz was taken on " +
              formatDate(qz.qzDate, "yyyy-MM-dd", "en-US") +
              " next quiz can be taken starting " +
              formatDate(qz.nextDate, "yyyy-MM-dd", "en-US");
            this.snackBarService.openSnackBar(msg, "warn");
            this.router.navigate(["/"]);
          }
        },
        (err) => {
          this.snackBarService.openSnackBar(
            "A problem with the username, try again",
            "error"
          );
          this.router.navigate(["/"]);
        }
      );
  }

  private takeQuiz() {
    this.quizService.quiz.TimeSpent = 0;
    this.quizService.qnNumber = 0;
    this.quizService.qnProgress = 0;
    this.quizService
      .getQuestions(this.userService.userInfo.ParticipantID)
      .subscribe((data: any) => {
        if (data.length !== 0) {
          this.quizService.qns = data;
          this.quizService.countDown = data
            .map((x: any) => x.QnTime)
            .reduce((i, sum) => i + sum, 0);
          this.quizService.startTimer();
        } else {
          const msg =
            "You have completed all questions. Cannot take a quiz. Contact your supervisor to reset";
          this.snackBarService.openSnackBar(msg, "info");
        }
      });
  }

  Answer(choice: number) {
    this.quizService.qns[this.quizService.qnNumber].answer = choice + 1;
    this.quizService.qnProgress += (1 / this.quizService.qns.length) * 100;
  }
}
