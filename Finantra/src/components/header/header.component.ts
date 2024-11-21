import { Component, inject } from '@angular/core';
import { UtilsService } from '@services/utilsService/utils.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '@models/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected user: User={
    lastName: "Doe",
    firstName:"Jonh",
    email:""
  };
  constructor (private util:UtilsService){
    const userFromStorage = sessionStorage.getItem("user");
    if(userFromStorage){
      this.user= JSON.parse(userFromStorage);
    }
  }

  logout():void{
    this.util.auth.logout();
    this.util.redirect.navigate(["/auth"]);
  }
}
