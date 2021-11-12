import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { QuizService } from './../../../shared/services/quiz.service';

export interface IGrade {
  date: Date;
  qtr: string;
  score: number;
  timespent: number;
  status: string;
}

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  displayedColumns: string[] = ['date', 'qtr', 'score', 'timespent', 'status'];
  dataSource = new MatTableDataSource<IGrade>();
  grades$: Observable<any>;
  periods: string[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getGrades().subscribe( (g: IGrade[]) => {
      this.dataSource = new MatTableDataSource(g);
      this.dataSource.paginator = this.paginator;
      this.getQtrGrades(g);
    });
  }

  getQtrGrades(array: any[]) {
    const qtrAry = array.reduce((r, e) => {
      r.push([e.qtr, e.score, 1]);
      return r;
    }, []);

    const p = [];
    const reduced = qtrAry.reduce((r, e) => {
      const key = e[0];
      if (!p[key]) {
        p[key] = e;
        r.push(p[key]);
      } else {
        p[key][1] += e[1];
        p[key][2]++;
      }
      return r;
    }, []);

    this.periods = reduced.map((c: string) => _.values(c)[0]);
    this.grades$ = of(reduced.map((x: any) => {
      return Math.ceil((_.values(x)[1] / _.values(x)[2]) * 100);
    }));
  }
}
