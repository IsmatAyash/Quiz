import { SnackBarComponent } from 'shared/components/snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  messageText: string [];
  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  public openSnackBar(message, type) {
    this.config.panelClass = [type];
    this.config.data = { message, snackType: type, snackBar: this.snackBar };
    this.snackBar.openFromComponent(SnackBarComponent, this.config);
  }
}
