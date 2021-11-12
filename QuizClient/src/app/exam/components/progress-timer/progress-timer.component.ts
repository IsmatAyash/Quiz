import { QuizService } from 'shared/services/quiz.service';
import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { GV } from 'shared/Models/global-var';

@Component({
  selector: 'progress-timer',
  templateUrl: './progress-timer.component.html',
  styles: []
})
export class ProgressTimerComponent {
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  bufferValue = GV.NOQ * 10;
  value = 0;

  constructor(public quizService: QuizService) { }
}
