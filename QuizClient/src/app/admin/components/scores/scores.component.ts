import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { QuizService } from 'shared/services/quiz.service';
import { Observable, of } from 'rxjs';

export interface IScore {
  fullname: string;
  qtr1: number;
  qtr2: number;
  qtr3: number;
  qtr4: number;
}

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  displayedColumns: string[] = ['fullname', 'qtr1', 'qtr2', 'qtr3', 'qtr4'];
  dataSource = new MatTableDataSource<IScore>();
  qtrdata$: Observable<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getAllGrades().subscribe((ss) => {
      const scores = this.qtrScores(ss);
      this.dataSource = new MatTableDataSource(scores);
      this.dataSource.paginator = this.paginator;
      this.qtrdata$ = of(this.qtrData(scores));
    });
  }

  qtrScores(ss): IScore[] {
    const array: any[] = [];
    let iscore = {} as IScore;
    iscore.fullname = ss[0].FullName;
    ss.forEach((pp) => {
      if (pp.FullName !== iscore.fullname) {
        array.push(iscore);
        iscore = {} as IScore;
        iscore.fullname = pp.FullName;
      }
      iscore.qtr1 = (pp.Qtr === 'Qtr1' && !iscore.qtr1) ? pp.Score : iscore.qtr1;
      iscore.qtr2 = (pp.Qtr === 'Qtr2' && !iscore.qtr2) ? pp.Score : iscore.qtr2;
      iscore.qtr3 = (pp.Qtr === 'Qtr3' && !iscore.qtr3) ? pp.Score : iscore.qtr3;
      iscore.qtr4 = (pp.Qtr === 'Qtr4' && !iscore.qtr4) ? pp.Score : iscore.qtr4;
    });
    array.push(iscore);
    return array;
  }

  qtrData(scores): number[] {
    let ctr = 0;
    const sums = [0, 0, 0, 0];

    scores.forEach(obj => {
      ctr++;
      sums[0] += obj.qtr1 || 0;
      sums[1] += obj.qtr2 || 0;
      sums[2] += obj.qtr3 || 0;
      sums[3] += obj.qtr4 || 0;
    });

    return sums.reduce((d, v) => {
      d.push(Math.round((v / ctr) * 100));
      return d;
    }, []);

  }
}
