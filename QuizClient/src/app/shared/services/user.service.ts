import { UserInfo } from "../../core/components/login/user-info";
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Quiz } from "shared/Models/quiz.interface";

interface IQuizDates {
  qzDate: Date;
  nextDate: Date;
  canTake: boolean;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  readonly rootUrl = environment.baseUrl;
  userInfo = {} as UserInfo;
  quiz = {} as Quiz;

  constructor(private http: HttpClient) {}

  get(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.rootUrl + "/api/user").pipe(
      map((u) => {
        return u
          ? {
              ParticipantID: u.ParticipantID,
              FullName: u.FullName,
              Email: u.Email,
              UserRole: u.UserRole,
              Q1Grade: u.Q1Grade,
              Q2Grade: u.Q2Grade,
              Q3Grade: u.Q3Grade,
              Q4Grade: u.Q4Grade,
              LastResetDate: u.LastResetDate,
            }
          : null;
      })
    );
  }

  save(user: UserInfo) {
    return this.http.post(this.rootUrl + "/api/user", JSON.stringify(user));
  }

  quizTaken(): Observable<IQuizDates> {
    const userName = JSON.parse(sessionStorage.getItem("username"));
    return this.http.get<IQuizDates>(this.rootUrl + "/api/user/" + userName);
  }
}
