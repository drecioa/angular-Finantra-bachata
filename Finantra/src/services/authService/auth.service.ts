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

  login(user:User, token:string):void{
    sessionStorage.setItem("sessionState", "true");
    sessionStorage.setItem("user", `${JSON.stringify(user)}`);
    sessionStorage.setItem("JWT", token);
    this.dataBehavior.next(this.getUser());
  }

  logout():void{
    sessionStorage.clear();
  }

  getToken():string| null{
    return sessionStorage.getItem("JWT");
  }

  isLogged():boolean{
    return sessionStorage.getItem("sessionState")==="true";
  }

  getUser():String| null{
    return sessionStorage.getItem("user");
  }
}
