import { Category } from 'shared/Models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly rootUrl = environment.baseUrl;

  form: FormGroup = new FormGroup({
    CategoryID: new FormControl(0),
    CategoryName: new FormControl(null, Validators.required)
  });

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.rootUrl + '/api/Category');
  }

  postCategory(cat: Category) {
    return this.http.post(this.rootUrl + '/api/Category', JSON.stringify(cat));
  }

  putCategory(cat: Category) {
    return this.http.put(this.rootUrl + '/api/Category/' + cat.CategoryID, JSON.stringify(cat));
  }

  deleteCategory(catid: number) {
    return this.http.delete(this.rootUrl + '/api/Category/' + catid);
  }

  populateCategory(category) {
    this.form.setValue(category);
  }

  initializeFormGroup() {
    this.form.setValue({
      CategoryID: 0,
      CategoryName: null
    });
  }
}
