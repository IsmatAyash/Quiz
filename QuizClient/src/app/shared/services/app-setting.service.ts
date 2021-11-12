import { GV } from 'shared/Models/global-var';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AppSetting } from 'shared/Models/app-setting';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppSettingService {
  readonly rootUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getSetting(): Observable<AppSetting> {
    return this.http.get<AppSetting>(this.rootUrl + '/api/appsetting');
  }

  save(appSetting) {
    const id = 1;
    return this.http.put(
      this.rootUrl + '/api/appsetting/' + id,
      JSON.stringify(appSetting)
    );
  }

  loadAppConfig() {
    return this.http
      .get(this.rootUrl + '/api/Appsetting')
      .toPromise()
      .then((data) => {
        GV.NOQ = data[0].NumberOfQuestions;
        GV.DaysBetweenQuizes = data[0].DaysBetweenQuizes;
      });
  }

  getConfig() {
    return GV;
  }
}
