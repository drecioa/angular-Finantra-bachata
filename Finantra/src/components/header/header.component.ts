import { Component, inject } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { UtilsService } from '@services/utilsService/utils.service';
import { FormBancoComponent } from "../form-banco/form-banco.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HomeComponent, FormBancoComponent],
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
