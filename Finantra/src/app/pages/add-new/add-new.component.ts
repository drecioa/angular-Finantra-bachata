import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, HeaderComponent],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.css'
})
export class AddNewComponent {
  
  redirectToBank(): void {
    window.location.href = 'http://localhost:8080/api/v1/bank/auth';
  }
}
