import { Component, inject } from '@angular/core';
import { UtilsService } from '@services/utilsService/utils.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor (private util:UtilsService){}
  page:string = 'home';

  logout():void{
    this.util.auth.logout();
    this.util.redirect.navigate(["/auth"]);
  }

  setPage(page:string):void {
    this.page = page;
  }
}
