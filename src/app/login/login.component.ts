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

    this.authService.getUserByName(userName).subscribe(result => {
      this.userData = result;
      if(password === this.userData.data[0].password)
      {
        if(this.userData.data[0].isActive){
          sessionStorage.setItem("username", this.userData.data[0].userName);
          sessionStorage.setItem("role", this.userData.data[0].role);
          this.router.navigate(['']);
        }else{
          this.toastr.warning("please contact admin", "Not active user")
        }
      } else{
        this.toastr.warning("invalid credentials")
      }
      
    })

  }

}
