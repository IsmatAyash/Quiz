import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Question } from "shared/Models/question";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  readonly rootUrl = environment.baseUrl;

  form: FormGroup = new FormGroup({
    QnID: new FormControl(0),
    ImageName: new FormControl(null),
    Qn: new FormControl("", Validators.required),
    Option1: new FormControl(null, Validators.required),
    Option2: new FormControl(null, Validators.required),
    Option3: new FormControl(null),
    Option4: new FormControl(null),
    Option5: new FormControl(null),
    Answer: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
      Validators.maxLength(1),
    ]),
    AnswerDescription: new FormControl(null),
    CategoryID: new FormControl(null, Validators.required),
    QnTime: new FormControl(null, [Validators.required, Validators.min(5)]),
    QnVolatile: new FormControl(false),
    Active: new FormControl(true, Validators.required),
  });

  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get(this.rootUrl + "/api/Question");
  }

  insertQuestion(qn: Question) {
    return this.http.post(this.rootUrl + "/api/Question", JSON.stringify(qn));
  }

  updateQuestion(qn: Question) {
    return this.http.put(
      this.rootUrl + "/api/Question/" + qn.QnID,
      JSON.stringify(qn)
    );
  }

  deleteQuestion(qnid: number) {
    return this.http.delete(this.rootUrl + "/api/Question/" + qnid);
  }

  uploadImage(formData: FormData) {
    return this.http.post(this.rootUrl + "/api/question/upload", formData, {
      reportProgress: true,
      observe: "events",
    });
  }

  createImgPath(imgName: string): string {
    return this.rootUrl + "/Images/" + imgName;
  }

  populateQuestion(question) {
    this.form.setValue(_.omit(question, "Category"));
  }

  initializeFormGroup() {
    this.form.setValue({
      QnID: 0,
      Qn: "",
      ImageName: null,
      Option1: null,
      Option2: null,
      Option3: null,
      Option4: null,
      Option5: null,
      Answer: null,
      AnswerDescription: null,
      CategoryID: null,
      QnTime: null,
      QnVolatile: false,
      Active: true,
    });
  }
}
