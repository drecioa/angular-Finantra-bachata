import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from '@components/register/register.component';
import { LoginComponent } from "../components/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, RegisterComponent, LoginComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Finantra';
}
