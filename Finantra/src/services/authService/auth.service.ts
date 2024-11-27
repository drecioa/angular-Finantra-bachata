import { Injectable } from '@angular/core';
import { User } from '@models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dataBehavior=new BehaviorSubject<any>(this.getUser());

  data= this.dataBehavior.asObservable();
  
  constructor() { }

  login(user:User):void{
    sessionStorage.setItem("sessionState", "true");
    sessionStorage.setItem("user", `${JSON.stringify(user)}`);
    this.dataBehavior.next(this.getUser());
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
