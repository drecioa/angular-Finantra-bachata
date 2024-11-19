import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '@services/registerService/register.service';
import { CommonModule } from '@angular/common';
import { RegisterDTO } from '@models/register-dto.model';
import { AuthService } from '@services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [RegisterService]
})
export class RegisterComponent {
  private auth=inject(AuthService);
  private redirect=inject(Router);
  registerForm:FormGroup;
  registerStatus: string | null = null;
  
  constructor(private formGroup: FormBuilder, private registerService:RegisterService) {
    this.registerForm = this.formGroup.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  submitRegister(): void {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe(
        (response) => {
          this.registerStatus = 'Registro exitoso!';
          this.redirect.navigate(["/auth/login"])
          console.log(response);
        }, 
        (error) => {
          this.registerStatus = 'Registro fallido!';
          console.log(error);
        }
      )
    } else {
      console.log("Respuesta no enviada");
    }
  }
}
