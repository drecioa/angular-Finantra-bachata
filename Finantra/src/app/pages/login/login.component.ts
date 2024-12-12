import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '@services/utilsService/utils.service';
import { RouterLink } from '@angular/router';
import { User } from '@models/User';
import { LoginService } from '@services/loginService/login-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected form: FormGroup;
  constructor(private loginService: LoginService, private builder: FormBuilder, private utilService:UtilsService){
    this.form=this.builder.group({
       email:['', [Validators.required, Validators.email]],
       password:['', Validators.required]
    });
  }
  
  logIn():void{
    if(this.form.valid){
      this.loginService.checkUser(this.form.value).subscribe(
        (data)=>{
          console.log(data);
          const user:User={
            firstName: data.body.data.firstName,
            lastName: data.body.data.lastName,
            email: data.body.data.email,
            password:this.form.get('password')?.value //TODO: Borrar este campo del modelo
          };
          this.utilService.auth.login(user, data.headers.get('Authorization'));
          this.utilService.redirect.navigate(["/home"]);
        }, 
        (error)=>{
          console.error(error);

          const err = document.getElementById("error");
          if (err) {
            err.style.visibility = "visible";
          }
        }
      );
    }
  }
}
