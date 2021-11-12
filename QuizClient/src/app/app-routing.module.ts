import { AppSettingComponent } from './admin/components/app-setting/app-setting.component';
import { QuizComponent } from './exam/components/quiz/quiz.component';
import { LoginComponent } from './core/components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizResultComponent } from './exam/components/quiz-result/quiz-result.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { QuestionsComponent } from './admin/components/questions/questions.component';
import { AdminAuthGuard } from 'shared/services/admin-auth-guard.service';
import { SupervisorAuthGuard } from 'shared/services/supervisor-auth-guard.service';
import { ParticipantsComponent } from './admin/components/participants/participants.component';
import { CategoriesComponent } from './admin/components/categories/categories.component';
import { GradesComponent } from './exam/components/grades/grades.component';
import { ScoresComponent } from './admin/components/scores/scores.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'result', component: QuizResultComponent },
  { path: 'grades', component: GradesComponent },
  { path: 'questions', component: QuestionsComponent, canActivate: [SupervisorAuthGuard] },
  { path: 'setting', component: AppSettingComponent, canActivate: [AdminAuthGuard] },
  { path: 'participants', component: ParticipantsComponent, canActivate: [AdminAuthGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [SupervisorAuthGuard] },
  { path: 'scores', component: ScoresComponent, canActivate: [SupervisorAuthGuard] },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
