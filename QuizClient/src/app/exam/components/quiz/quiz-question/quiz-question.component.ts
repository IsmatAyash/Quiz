import { Component, OnInit } from '@angular/core';
import { QuizService } from 'shared/services/quiz.service';
import { Router } from '@angular/router';
import { DialogService } from 'shared/services/dialog.service';

@Component({
  selector: 'quiz-question',
  templateUrl: './quiz-question.component.html',
  styles: []
})
export class QuizQuestionComponent {

  isPrev = true;
  nextButton = '';

  constructor(
    public quizService: QuizService,
    private router: Router,
    private dialogService: DialogService) {
      this.nextButton = (this.quizService.qns.length === 1) ? 'Submit' : 'Next';
     }

  goBack() {
    this.quizService.qnNumber--;
    this.isPrev = this.quizService.qnNumber === 0;
    this.nextButton = (this.quizService.qnNumber < this.quizService.qns.length - 1) ? 'Next' : 'Submit';
  }

  submitOrNext() {
    if (this.quizService.qnNumber === this.quizService.qns.length - 1)
      this.submitQuiz();
    else {
      this.quizService.qnNumber++;
      this.nextButton = (this.quizService.qnNumber < this.quizService.qns.length - 1) ? 'Next' : 'Submit';
      this.isPrev = this.quizService.qnNumber === 0;
    }
  }

  private submitQuiz() {
    this.dialogService.openConfirmDialog('Are you sure you want to submit?')
    .afterClosed().subscribe(res => {
      if (res)
        this.router.navigate(['/result']);
    });
  }
}
