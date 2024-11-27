import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '@models/loginDto';
import { User } from '@models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private apiUrl = `http://localhost:8080/api/v1/user`;
  constructor(private httpClient:HttpClient) { }

  updateUser(loginDTO:LoginDto, updateDTO:User):Observable<any>{
    console.log({loginDTO, updateDTO});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.apiUrl, {loginDTO, updateDTO}, {headers});
  }
}
