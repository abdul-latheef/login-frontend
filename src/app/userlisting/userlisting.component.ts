import { Component, ViewChild, viewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrl: './userlisting.component.css'
})
export class UserlistingComponent {

  displayedColumns: string[] = ['id', 'userName', 'name', 'email', 'role', 'isActive', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(
    private authService: AuthService,
    
  ){
    this.authService.getAllUser().subscribe((res:any) => {
      this.dataSource = res.data;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnInit(){

  }

  updateUser(id:any){

  }

}
