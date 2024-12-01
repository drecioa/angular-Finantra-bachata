import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoginDto } from '../../models/loginDto';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUrl="http://127.0.0.1:8080/api/v1/auth/login"; /**introduce la url */
  constructor(private http: HttpClient) { }

  checkUser(login: LoginDto):Observable<any>{
    return this.http.post(this.apiUrl, login);
  }
}
