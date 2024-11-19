import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login():void{
    sessionStorage.setItem("sessionState", "true");
  }

  logout():void{
    sessionStorage.removeItem("sessionState");
  }

  isLogged():boolean{
    return sessionStorage.getItem("sessionState")==="true";
  }
}
