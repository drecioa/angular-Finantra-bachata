import { Component, inject } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { AuthService } from '@services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  page:string = 'home';

  setPage(page:string):void {
    this.page = page;
  }
  private auth=inject(AuthService);
  private redirect=inject(Router);
  logout():void{
    this.auth.logout();
    this.redirect.navigate(["/auth"]);
  }
}
