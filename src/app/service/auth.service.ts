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
    return this.http.get(`${this.apiURL}/users`)
  }

  addUser(inputData: any) {
    return this.http.post(`${this.apiURL}/users`, inputData);
  }

  getUserByName(name:any){
    return this.http.get(`${this.apiURL}/users`, name)
  }

  isLoggedIn(){
    return sessionStorage.getItem("username") != null;
  }

  getUserRole(){
    return sessionStorage.getItem("role")!=null?sessionStorage.getItem("role")?.toString(): "";
  }

}
