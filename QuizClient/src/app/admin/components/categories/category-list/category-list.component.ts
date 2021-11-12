import { Category } from 'shared/Models/category';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from 'shared/services/category.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'shared/services/dialog.service';
import { SnackBarService } from 'shared/services/snack-bar.service';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styles: []
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  datasource: MatTableDataSource<Category>;
  displayedColumns: string[] = ['CategoryID', 'CategoryName', 'actions' ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  dataChange: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  constructor(
    private cs: CategoryService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private snackbarService: SnackBarService) { }

  ngOnInit(): void {
    this.cs.getCategories().subscribe((cats: Category[]) => {
      this.dataChange.next(cats);
      this.datasource = new MatTableDataSource(cats);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });
  }

  onCreate() {
    this.cs.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CategoryComponent, dialogConfig).afterClosed()
    .subscribe(result => {
      if (result) this.refreshDatasource(result, 0, 'create');
    });
  }

  onEdit(row: any) {
    this.cs.populateCategory(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CategoryComponent, dialogConfig).afterClosed()
    .subscribe(result => {
      if (result) this.refreshDatasource(result, row.CategoryID, 'edit');
    });
  }

  onDelete(catid: number) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this category?')
    .afterClosed().subscribe(res => {
      if (res)
        this.cs.deleteCategory(catid).subscribe((deleted) => {
          if (deleted) {
            this.snackbarService.openSnackBar('Deleted successfully', 'success');
            this.refreshDatasource(deleted, catid, 'delete');
          } else
            this.snackbarService.openSnackBar('This Category cannot be deleted. Already used !!', 'error');
        });
    });
  }

  private refreshDatasource(res: any, id: number, action: string) {
    const foundIndex = this.datasource.data.findIndex(x => x.CategoryID === id);
    switch (action) {
      case 'create': {
        this.dataChange.value.push(res);
        this.sort.sort({id: 'CategoryID', start: 'desc', disableClear: false});
        this.datasource.sort = this.sort;
        break;
      }
      case 'edit': {
        this.dataChange.value[foundIndex] = res;
        break;
      }
      case 'delete': {
        this.dataChange.value.splice(foundIndex, 1);
        break;
      }
    }
    this.datasource.paginator = this.paginator;
  }

  applyFilter() {
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  ngOnDestroy() {
    this.dataChange.next(null);
    this.dataChange.complete();
  }

}
