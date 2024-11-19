import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SessionComponent } from '@components/session/session.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [SessionComponent, RouterOutlet, RouterLink],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Finantra';
}
