import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Router } from "@angular/router";
import { Quiz } from "shared/Models/quiz.interface";

@Injectable({
  providedIn: "root",
})
export class QuizService {
  readonly rootUrl: string = environment.baseUrl;
  readonly usr: string = JSON.parse(sessionStorage.getItem("username"));
  quiz = {} as Quiz;
  qzID = 0;
  qns: any[];
  timer;
  countDown: number;
  qnProgress: number;
  qnNumber: number;
  correctAnswerCount = 0;

  constructor(private http: HttpClient, private router: Router) {}

  displayTimeElapsed() {
    const timeElapsed =
      Math.floor(this.quiz.TimeSpent / 3600) +
      ":" +
      Math.floor(this.quiz.TimeSpent / 60) +
      ":" +
      Math.floor(this.quiz.TimeSpent % 60);
    clearInterval(this.timer);
    return timeElapsed;
  }

  displayCountDown() {
    return (
      Math.floor(this.countDown / 3600) +
      ":" +
      Math.floor(this.countDown / 60) +
      ":" +
      Math.floor(this.countDown % 60)
    );
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.quiz.TimeSpent++;
      this.countDown--;
      if (this.countDown < 0) {
        clearInterval(this.timer);
        this.router.navigate(["/result"]);
      }
    }, 1000);
  }

  getQuestions(user: string) {
    return this.http.get(this.rootUrl + "/api/Quiz/" + user);
  }

  getAnswers() {
    const body = this.qns.map((x) => x.QnID);
    return this.http.post(this.rootUrl + "/api/Answers", JSON.stringify(body));
  }

  getGrades() {
    return this.http.post(this.rootUrl + "/api/Grades?pid=" + this.usr, null);
  }

  getAllGrades() {
    return this.http.get(this.rootUrl + "/api/Grades");
  }

  getIdentity() {
    return this.http.get(this.rootUrl + "/api/Identity");
  }

  insertQuiz() {
    this.quiz.ParticipantID = JSON.parse(sessionStorage.getItem("username"));
    this.quiz.Quizdate = new Date();
    this.quiz.Score = 0;
    this.quiz.QuizResults = [];
    return this.http.post(
      this.rootUrl + "/api/Quiz",
      JSON.stringify(this.quiz)
    );
  }

  updateQuiz(qId) {
    this.quiz.ParticipantID = JSON.parse(sessionStorage.getItem("username"));
    this.quiz.QuizID = qId;
    this.quiz.Quizdate = new Date();
    this.quiz.Score =
      this.qns.length > 0 ? this.correctAnswerCount / this.qns.length : 0;
    this.quiz.QuizResults = this.qns.map((x) => ({
      QnID: x.QnID,
      QuizID: qId,
      ParticipantID: this.quiz.ParticipantID,
      AnsStatus: x.answer === x.correct ? "Correct" : "Incorrect",
      Countable: true,
    }));
    return this.http.put(
      this.rootUrl + "/api/QuizResult/" + qId,
      JSON.stringify(this.quiz)
    );
  }

  resetQn(pid) {
    return this.http.post(this.rootUrl + "/api/Reset?pid=" + pid, null);
  }
}
