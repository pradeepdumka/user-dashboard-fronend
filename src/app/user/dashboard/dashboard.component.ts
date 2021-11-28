import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserServices } from 'src/app/services/user.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['year', 'title', 'directors', 'release_date', 'details'];
  dataSource = new MatTableDataSource();
  filterValue: any;
  viewMovie: any
  isShowDetails: boolean = false;
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = this.filterPipe.transform(this.dataSource,this.filterValue);
  }
  constructor(
    private userServices: UserServices,

  ) { }

  ngOnInit(): void {
    this.userServices.getAllMovies().subscribe((res) => {
      this.dataSource = res.data;
    })
  }

  viewDetails(data: any) {

    this.isShowDetails = true;
    this.viewMovie = data;
  }
  goBackState(data: any) {
    if (data) {
      this.isShowDetails = false;
    }

  }
}
