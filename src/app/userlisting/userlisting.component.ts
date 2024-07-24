import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrl: './userlisting.component.css'
})
export class UserlistingComponent {

  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource = new MatTableDataSource<any>();

  constructor(private authService: AuthService){
    this.authService.getAllUser().subscribe((res:any) => {
      this.dataSource.data = res;
    })
  }

  ngOnInit(){

  }

}
