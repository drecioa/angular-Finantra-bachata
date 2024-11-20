import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-banco',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-banco.component.html',
  styleUrl: './form-banco.component.css'
})
export class FormBancoComponent {
  protected form:FormGroup;
  constructor (private builder:FormBuilder) {
    this.form = this.builder.group({
      bank:['', Validators.required],
      country:['', Validators.required],
      username:['', Validators.required],
      password:['', Validators.required]
    });
  }

}
