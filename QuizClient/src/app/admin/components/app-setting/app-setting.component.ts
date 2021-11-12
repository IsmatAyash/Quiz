import { QuizService } from 'shared/services/quiz.service';
import { ParticipantService } from './../../../shared/services/participant.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'shared/services/snack-bar.service';
import { AppSettingService } from 'shared/services/app-setting.service';
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-setting',
  templateUrl: './app-setting.component.html',
  styles: [],
})
export class AppSettingComponent {
  daysBetQzs = 0;
  noOfQns = 0;
  defaultUsrRole = '';
  userRoles = '';

  constructor(
    private settingService: AppSettingService,
    private snackbar: SnackBarService,
    private ps: ParticipantService,
    private qs: QuizService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.settingService.getSetting().subscribe((x) => {
      this.noOfQns = x[0].NumberOfQuestions;
      this.daysBetQzs = x[0].DaysBetweenQuizes;
      this.defaultUsrRole = x[0].DefaultUserRole;
      this.userRoles = x[0].UserRoles;
    });
  }

  onSubmit(f: NgForm) {
    this.settingService.save(f.value).subscribe(() => {
      this.snackbar.openSnackBar('Settings Saved successfully', 'success');
      this.router.navigate(['/']);
    });
  }

  onClose() {
    this.router.navigate(['/']);
  }

  resetQn() {
    this.ps.getParticipants().subscribe((p: any[]) => {
      const users = p.map((x) => x.ParticipantID);

      const dialogRef = this.dialog.open(ResetQnDialogComponent, {
        width: '350px',
        data: users,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.qs.resetQn(result).subscribe((res) => {
          if (res)
            this.snackbar.openSnackBar(
              'Successful Question Reseting',
              'success'
            );
          else
            this.snackbar.openSnackBar(
              'There are still available Questions to be asked. Cannot reset',
              'error'
            );
        });
      });
    });
  }
}

@Component({
  selector: 'reset-qn',
  templateUrl: 'reset-qn-dialog-component.html',
})
export class ResetQnDialogComponent {
  selectedAgent = '';
  constructor(
    public dialogRef: MatDialogRef<ResetQnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(this.selectedAgent);
  }
}
