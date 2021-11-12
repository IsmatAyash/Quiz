import { UserInfo } from '../../core/components/login/user-info';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  readonly rootUrl: string = environment.baseUrl;
  readonly usr: string = JSON.parse(sessionStorage.getItem('username'));

  form: FormGroup = new FormGroup({
    ParticipantID: new FormControl(''),
    FullName: new FormControl(null, Validators.required),
    Email: new FormControl(null, Validators.required),
    Q1Grade: new FormControl(null),
    Q2Grade: new FormControl(null),
    Q3Grade: new FormControl(null),
    Q4Grade: new FormControl(null),
    LastResetDate: new FormControl(null),
    UserRole: new FormControl(null)
  });


  constructor(private http: HttpClient) { }

  getParticipants() {
    return this.http.get(this.rootUrl + '/api/Participant');
  }

  getParticipant() {
    return this.http.get(this.rootUrl + '/api/Participant/' + this.usr);
  }

  updateParticipant(usr: UserInfo) {
    return this.http.put(this.rootUrl + '/api/Participant/' + usr.ParticipantID, JSON.stringify(usr));
  }

  deleteParticipant(pid: string) {
    return this.http.delete(this.rootUrl + '/api/Participant/' + pid);
  }

  populateQuestion(usr: UserInfo) {
    this.form.setValue(_.omit(usr, 'QuizResults'));
  }
}
