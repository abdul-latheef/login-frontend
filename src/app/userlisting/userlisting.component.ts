import { Component, ViewChild, viewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrl: './userlisting.component.css'
})
export class UserlistingComponent {

  displayedColumns: string[] = ['id', 'userName', 'name', 'email', 'role', 'isActive', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  
  users:any;

  colorArray = ["Red", "Blue", "Black"]
  filterOptions!: Observable<any[]>
  formcontrol =  new FormControl('');

  constructor(
    private authService: AuthService,
  ){
    this.authService.getAllUser().subscribe((res:any) => {
      this.dataSource = res.data;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnInit(){
    this.authService.getAllUsersName().subscribe((response:any) => {
      this.users = response.data;
      this.filterOptions = this.formcontrol.valueChanges.pipe(
        startWith(''),
        map(value=>this._FILTER(value || ''))
      )
    });
  }
  
  private _FILTER(value:string):any[]{
    const searchValue = typeof value === 'string' ? value.toLowerCase() : '';
    
    return this.users && this.users.filter((option: any) => {
      const nameMatch = option.name.toLowerCase().includes(searchValue);
      const idMatch = option.id != null && option.id.toString().includes(searchValue);
      
      return nameMatch || idMatch;
    })
  }

  displayFn(option: any): string {
    if (option) {
      return `${option.id} ${option.name}` 
    }
    return '';
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {

    } else if (event.key === 'Enter') {
      const getValue =  this.formcontrol.getRawValue();
      const foundUser = this.users.find((obj:any) => 
        obj.id == getValue || obj.name.includes(getValue)
      );
      this.formcontrol.setValue(foundUser)
    }
    // Add other key handling logic as needed
  }


  updateUser(id:any){

  }

}
