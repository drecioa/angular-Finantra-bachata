import { Injectable } from '@angular/core';
import { User } from '@models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user:User):void{
    sessionStorage.setItem("sessionState", "true");
    sessionStorage.setItem("user", `${user}`);
  }

  logout():void{
    sessionStorage.removeItem("sessionState");
  }

  isLogged():boolean{
    return sessionStorage.getItem("sessionState")==="true";
  }

  getUser():String| null{
    return sessionStorage.getItem("user");
  }
}
