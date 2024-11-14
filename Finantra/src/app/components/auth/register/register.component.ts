import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm:FormGroup;
  
  constructor(private formGroup: FormBuilder) {
    this.registerForm = this.formGroup.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  submitRegister(): void {
    if (this.registerForm.valid) {
      console.log("Respuesta enviada: ", this.registerForm.value);
    } else {
      console.log("Respuesta no enviada");
    }
  }
}
