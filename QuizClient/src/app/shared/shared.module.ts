import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AngularMaterialModule } from '../angular-material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ErrorIntercept } from './Interceptors/error.interceptor';
import { HttpRequestInterceptor } from './Interceptors/HttpRequest.interceptor';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { CategoryService } from './services/category.service';
import { DialogService } from './services/dialog.service';
import { ParticipantService } from './services/participant.service';
import { QuestionService } from './services/question.service';
import { QuizService } from './services/quiz.service';
import { SnackBarService } from './services/snack-bar.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  exports: [
    ConfirmDialogComponent,
    SnackBarComponent
  ],
  providers: [
    QuizService,
    ParticipantService,
    UserService,
    QuestionService,
    CategoryService,
    AuthGuard,
    DialogService,
    SnackBarService,
    AdminAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true }
  ],
  entryComponents: [
    ConfirmDialogComponent,
    SnackBarComponent
  ]
})
export class SharedModule { }
