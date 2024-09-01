import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) {
    
  }

  apiURL = 'http://localhost:6969';

  getAllUser()
  {
    return this.http.get(`${this.apiURL}/users/getUsers`)
  }

  addUser(inputData: any) {
    return this.http.post(`${this.apiURL}/users/createUser`, inputData);
  }

  getUserByName(name:any){
    return this.http.post(`${this.apiURL}/users/login`, name)
  }

  getAllUsersName(){
    return this.http.get(`${this.apiURL}/users/getAllUsersName`)
  }

  isLoggedIn(){
    return sessionStorage.getItem("username") != null;
  }

  getUserRole(){
    return sessionStorage.getItem("role")!=null?sessionStorage.getItem("role")?.toString(): "";
  }

}
