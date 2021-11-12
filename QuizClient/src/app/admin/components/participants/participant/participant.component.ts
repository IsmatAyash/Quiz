import { SnackBarService } from 'shared/services/snack-bar.service';
import { ParticipantService } from 'shared/services/participant.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'participant',
  templateUrl: './participant.component.html',
  styles: []
})
export class ParticipantComponent implements OnInit {

  mandatoryMsg = 'This field is mandatory';
  currentRole: string;
  roles: string[] = ['Admin', 'Agent', 'Supervisor'];


  constructor(
    public ps: ParticipantService,
    private sb: SnackBarService,
    private dialogRef: MatDialogRef<ParticipantComponent>) {  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.ps.form.valid) {
      this.ps.updateParticipant(this.ps.form.value).subscribe(() => {
        this.sb.openSnackBar('Updated successfully', 'success');
      });
      this.onClose();
    }
  }

  onClose() {
    this.dialogRef.close(this.ps.form.value);
  }

}
