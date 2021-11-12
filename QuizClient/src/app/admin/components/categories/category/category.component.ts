import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'shared/services/snack-bar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: []
})
export class CategoryComponent {

  mandatoryMsg = 'This field is mandatory';

  constructor(
    public cs: CategoryService,
    private categoryService: CategoryService,
    private snackbarService: SnackBarService,
    private dialogRef: MatDialogRef<CategoryComponent>) { }

  onSubmit() {
    if (this.cs.form.valid)
      if (this.cs.form.value.CategoryID === 0)
        this.cs.postCategory(this.cs.form.value).subscribe((cats) => {
          this.snackbarService.openSnackBar('Category inserted successfully', 'success');
          this.onClose(cats);
        });
      else
        this.cs.putCategory(this.cs.form.value).subscribe((cats) => {
          this.snackbarService.openSnackBar('Category updated successfully', 'success');
          this.onClose(cats);
        });
    else
      this.snackbarService.openSnackBar('Something went wrong check!', 'error');
  }

  onClear() {
    this.cs.form.reset();
    this.cs.initializeFormGroup();
  }

  onClose(cats) {
    this.onClear();
    this.dialogRef.close(cats);
  }

}
