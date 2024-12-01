import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from '@services/utilsService/utils.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '@models/User';
import { EstadisticaGeneralComponent } from '@components/estadistica-general/estadistica-general.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, EstadisticaGeneralComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{
  protected user: User={
    lastName: "Doe",
    firstName:"Jonh",
    email:"",
    password:""
  };
  constructor (private util:UtilsService){}

  logout():void{
    this.util.auth.logout();
    this.util.redirect.navigate(["/auth"]);
  }

  ngOnInit(): void {
    this.util.auth.data.subscribe(
      (data)=>{
        this.user= JSON.parse(data);
      }
    );
  }
}
