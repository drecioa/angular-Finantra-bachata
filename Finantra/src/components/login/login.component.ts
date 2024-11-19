import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/loginService/login-service.service';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private auth=inject(AuthService);
  private redirect=inject(Router);
  protected form: FormGroup;
  constructor(private login: LoginService, private builder: FormBuilder){
    this.form=this.builder.group({
       email:['', [Validators.required, Validators.email]],
       password:['', Validators.required]
    });
  }
  
  logIn():void{
    if(this.form.valid){
      this.login.checkUser(this.form.value).subscribe(
        (data)=>{
          console.log(data);
          this.auth.login();
          this.redirect.navigate(["/home"]);
        }, 
        (error)=>{
          const err = document.getElementById("error");
          if (err) {
            err.style.visibility = "visible";
          }
          console.log(error);
        }
      );
    }
  }
}
