import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject } from "rxjs";
import { Question } from "shared/Models/question";
import { DialogService } from "shared/services/dialog.service";
import { QuestionService } from "shared/services/question.service";
import { SnackBarService } from "shared/services/snack-bar.service";

import { QuestionComponent } from "../question/question.component";

@Component({
  selector: "question-list",
  templateUrl: "./question-list.component.html",
  styles: [],
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  datasource: MatTableDataSource<Question>;
  displayedColumns: string[] = [
    "QnID",
    "CategoryID",
    "Qn",
    "Option1",
    "Option2",
    "Option3",
    "Option4",
    "Option5",
    "QnTime",
    "actions",
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  dataChange: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);

  constructor(
    private qs: QuestionService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private snackbarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.qs.getQuestions().subscribe((qns: Question[]) => {
      this.dataChange.next(qns);
      this.datasource = new MatTableDataSource(qns);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });
  }

  onCreate() {
    this.qs.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = "95vh";
    this.dialog
      .open(QuestionComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        if (result) this.refreshDatasource(result, 0, "create");
      });
  }

  onEdit(row: any) {
    this.qs.populateQuestion(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = "95vh";
    this.dialog
      .open(QuestionComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        if (result) this.refreshDatasource(result, row.QnID, "edit");
      });
  }

  onDelete(qnid: number) {
    this.dialogService
      .openConfirmDialog("Are you sure you want to delete this question?")
      .afterClosed()
      .subscribe((res) => {
        if (res)
          this.qs.deleteQuestion(qnid).subscribe((deleted) => {
            if (deleted) {
              this.snackbarService.openSnackBar(
                "Deleted successfully",
                "success"
              );
              this.refreshDatasource(deleted, qnid, "delete");
            } else
              this.snackbarService.openSnackBar(
                "This Question cannot be deleted. Already used !!",
                "error"
              );
          });
      });
  }

  private refreshDatasource(res: any, id: number, action: string) {
    const foundIndex = this.datasource.data.findIndex((x) => x.QnID === id);
    switch (action) {
      case "create": {
        this.dataChange.value.push(res);
        this.sort.sort({ id: "QnID", start: "desc", disableClear: false });
        this.datasource.sort = this.sort;
        break;
      }
      case "edit": {
        this.dataChange.value[foundIndex] = res;
        break;
      }
      case "delete": {
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
    this.searchKey = "";
    this.applyFilter();
  }

  ngOnDestroy() {
    this.dataChange.next(null);
    this.dataChange.complete();
  }
}
