import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '@models/loginDto';
import { User } from '@models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private apiUrl = `http://localhost:8080/api/v1/user/update`;
  constructor(private httpClient:HttpClient) { }

  updateUser(updateDTO:User):Observable<any>{
    let token: string = sessionStorage.getItem('JWT') || "";    
    return this.httpClient.post(this.apiUrl, updateDTO, { headers: new HttpHeaders({ 'Authorization': token }) });
  }
}
