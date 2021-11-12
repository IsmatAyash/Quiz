import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './../angular-material.module';
import { AppSettingComponent, ResetQnDialogComponent } from './components/app-setting/app-setting.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { ParticipantListComponent } from './components/participants/participant-list/participant-list.component';
import { ParticipantComponent } from './components/participants/participant/participant.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { QuestionListComponent } from './components/questions/question-list/question-list.component';
import { QuestionComponent } from './components/questions/question/question.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ScoresComponent } from './components/scores/scores.component';
import { ScoresChartComponent } from './components/scores/scores-chart/scores-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionComponent,
    QuestionListComponent,
    ParticipantComponent,
    ParticipantsComponent,
    ParticipantListComponent,
    CategoryComponent,
    CategoriesComponent,
    CategoryListComponent,
    AppSettingComponent,
    ScoresComponent,
    ScoresChartComponent,
    ResetQnDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HighchartsChartModule
  ],
  entryComponents: [
    QuestionComponent,
    ParticipantComponent,
    CategoryComponent,
    ResetQnDialogComponent
  ]
})
export class AdminModule { }
