import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [RegisterService]
})
export class RegisterComponent {
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
          console.log(response);
        }, 
        (error) => {
          console.log(error);
        }
      )
    } else {
      console.log("Respuesta no enviada");
    }
  }
}
