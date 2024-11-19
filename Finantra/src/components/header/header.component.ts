import { Component, inject } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { UtilsService } from '@services/utilsService/utils.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor (private util:UtilsService){}
  logout():void{
    this.util.auth.logout();
    this.util.redirect.navigate(["/auth"]);
  }
}
