import { GradeChartComponent } from './components/grades/grade-chart/grade-chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProgressTimerComponent } from './components/progress-timer/progress-timer.component';
import { QuizQuestionComponent } from './components/quiz/quiz-question/quiz-question.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { GradesComponent } from './components/grades/grades.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    ProgressTimerComponent,
    QuizQuestionComponent,
    QuizComponent,
    QuizResultComponent,
    GradesComponent,
    GradeChartComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HighchartsChartModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      outerStrokeWidth: 10,
      innerStrokeWidth: 3,
      outerStrokeColor: '#004080',
      innerStrokeColor: '#808080',
      animationDuration: 300,
      toFixed: 0,
      showSubtitle: true,
      startFromZero: true,
      animation: true,
      showUnits: true,
      titleFontSize: '23',
      subtitleFontSize: '15',
      unitsFontSize: '23',
      backgroundColor: '#F1F1F1'
    })
  ]
})
export class ExamModule { }
