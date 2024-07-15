import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm:FormGroup;
  
  constructor(private builder: FormBuilder, private toastr: ToastrService, private authService: AuthService, private router: Router) {

    this.registerForm = this.builder.group({
      userName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      name: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')])),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      gender: ['male'], 
      role: this.builder.control(''),
      isActive: this.builder.control(false),
    })

  }

  get password() {
    return this.registerForm.get('password');
  }

 
getPasswordErrorMessage() {
  const passwordControl = this.password;
  if (passwordControl) {
    if (passwordControl.hasError('required')) {
      return 'Password is required';
    } else if (passwordControl.hasError('pattern')) {
      return 'Password must be a valid email format';
    }
  }
  return '';
}

  proceed() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      this.authService.addUser(this.registerForm.value).subscribe(res => {
        
        this.toastr.success("Please contact admin for enable access", "Register Successfully")
        this.router.navigate(['login'])
      })

    } else {
      this.toastr.warning("Please enter valid data");
    }
  }

}
