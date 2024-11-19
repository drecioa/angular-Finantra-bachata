import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from '@components/register/register.component';
import { LoginComponent } from "../components/login/login.component";
import { HomeComponent } from "../components/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, RegisterComponent, LoginComponent, HomeComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Finantra';
}
