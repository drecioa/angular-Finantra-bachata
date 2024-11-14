import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoginDto } from '../../models/loginDto';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUrl="http://localhost:8080/api/v1/auth/login"; /**introduce la url */
  constructor(private http: HttpClient) { }

  checkUser(email:String, password:String):Observable<any>{
    return this.http.post<any>(this.apiUrl, new LoginDto(email, password));
  }
}
