import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SessionComponent } from '@components/session/session.component';
import { HeaderComponent } from "../components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [SessionComponent, RouterOutlet, RouterLink, HeaderComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Finantra';
}
