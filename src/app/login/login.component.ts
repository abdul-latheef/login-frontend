import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  userData:any;

  constructor(private builder: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService){

    this.loginForm = this.builder.group({
      userName:["", Validators.required],
      password: ["",Validators.required]
    })

    if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
      sessionStorage.clear();
    }

  }

  proceedLogin(){

    const userName = this.loginForm.value.userName;
const password = this.loginForm.value.password;
let userparams = {
  userName: userName
}
this.authService.getUserByName(userparams).subscribe(result => {
  this.userData = result;

  // Check if user data exists and is not empty
  if (this.userData?.data) {
    const user = this.userData.data;

    // Compare passwords
    if (password === user.password) {
      if (user.isActive) {
        sessionStorage.setItem("username", user.userName);
        sessionStorage.setItem("role", user.role);
        this.router.navigate(['']);
      } else {
        this.toastr.warning("Please contact admin", "Not active user");
      }
    } else {
      this.toastr.warning("Invalid credentials");
    }
  } else {
    this.toastr.warning("User not found");
  }
}, error => {
  console.error("Error fetching user data:", error);
  this.toastr.error("An error occurred while fetching user data");
});

  }

}
