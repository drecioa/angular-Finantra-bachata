import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '@services/registerService/register.service';
import { CommonModule } from '@angular/common';
import { UtilsService } from '@services/utilsService/utils.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [RegisterService]
})
export class RegisterComponent {
  registerForm:FormGroup;
  registerStatus: string | null = null;
  
  constructor(private formGroup: FormBuilder, private registerService:RegisterService, private util:UtilsService) {
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
          alert(this.registerStatus);
          this.util.redirect.navigate(["/auth/login"])
          console.log(response);
        }, 
        (error) => {
          this.registerStatus = 'Registro fallido!';
          alert(this.registerStatus);
          console.log(error);
        }
      )
    } else {
      console.log("Respuesta no enviada");
    }
  }
}
