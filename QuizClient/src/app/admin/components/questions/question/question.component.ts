import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'shared/services/category.service';
import { QuestionService } from 'shared/services/question.service';
import { Component } from '@angular/core';
import { SnackBarService } from 'shared/services/snack-bar.service';
import { Category } from 'shared/Models/category';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styles: []
})
export class QuestionComponent {

  public progress: number;
  imgSrc: string;
  categories: Category [] = [];
  mandatoryMsg = 'This field is mandatory';

  constructor(
    public qs: QuestionService,
    private categoryService: CategoryService,
    private snackbarService: SnackBarService,
    private dialogRef: MatDialogRef<QuestionComponent>) {
      this.imgSrc = this.qs.createImgPath(this.qs.form.value.ImageName);
      this.categoryService.getCategories().subscribe((cat: Category[]) => {
        this.categories = cat;
      });
    }

  onSubmit() {
    if (this.qs.form.valid)
      if (this.qs.form.value.QnID === 0)
        this.qs.insertQuestion(this.qs.form.value).subscribe((qns) => {
          this.snackbarService.openSnackBar('Question inserted successfully', 'success');
          this.onClose(qns);
        });
      else
        this.qs.updateQuestion(this.qs.form.value).subscribe((qns) => {
          this.snackbarService.openSnackBar('Question updated successfully', 'success');
          console.log('edited qns sent to dialog:', qns);
          this.onClose(qns);
        });
    else
      this.snackbarService.openSnackBar('Something went wrong check!', 'error');
  }

  public uploadImage = (image: string | any[]) => {
    if (image.length === 0)
      return;

    const imageToUpload =  image[0] as File;
    const formData = new FormData();
    formData.append('image', imageToUpload, imageToUpload.name);

    this.qs.uploadImage(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.imgSrc = this.qs.createImgPath(imageToUpload.name);
        this.qs.form.value.ImageName = imageToUpload.name;
      }
    });
  }

  onClear() {
    this.qs.form.reset();
    this.qs.initializeFormGroup();
  }

  onClose(qns) {
    this.onClear();
    this.dialogRef.close(qns);
  }
}
