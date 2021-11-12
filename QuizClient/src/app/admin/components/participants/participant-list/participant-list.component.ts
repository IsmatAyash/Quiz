import { SnackBarService } from 'shared/services/snack-bar.service';
import { ParticipantService } from 'shared/services/participant.service';
import { UserInfo } from '../../../../core/components/login/user-info';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ParticipantComponent } from '../participant/participant.component';
import { DialogService } from 'shared/services/dialog.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'participant-list',
  templateUrl: './participant-list.component.html',
  styles: []
})
export class ParticipantListComponent implements OnInit, OnDestroy {
  datasource: MatTableDataSource<UserInfo>;
  displayedColumns: string[] = ['ParticipantID', 'FullName', 'Email', 'LastResetDate', 'UserRole',
                                'Q1Grade', 'Q2Grade', 'Q3Grade', 'Q4Grade', 'actions' ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  dataChange: BehaviorSubject<UserInfo[]> = new BehaviorSubject<UserInfo[]>([]);

  constructor(
    private ps: ParticipantService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private sb: SnackBarService) { }

  ngOnInit(): void {
    this.ps.getParticipants().subscribe((users: UserInfo[]) => {
      this.dataChange.next(users);
      this.datasource = new MatTableDataSource(users);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });
  }

  applyFilter() {
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  onEdit(row: UserInfo) {
    this.ps.populateQuestion(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ParticipantComponent, dialogConfig).afterClosed()
    .subscribe(result => {
      if (result) this.refreshDatasource(result, row.ParticipantID, 'edit');
    });
  }

  onDelete(pid: string) {
    this.dialogService.openConfirmDialog('WARNING: This will delete all realted quizes. Sure to delete participat ?')
    .afterClosed().subscribe(res => {
      if (res)
        this.ps.deleteParticipant(pid).subscribe(() => {
          this.refreshDatasource(null, pid, 'delete');
          this.sb.openSnackBar('! Deleted successfully', 'warn');
        });
    });
  }

  private refreshDatasource(res: any, id: string, action: string) {

    const foundIndex = this.datasource.data.findIndex(x => x.ParticipantID === id);

    if (action === 'edit')
      this.dataChange.value[foundIndex] = res;
    else
      this.dataChange.value.splice(foundIndex, 1);

    this.datasource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.dataChange.next(null);
    this.dataChange.complete();
  }
}
