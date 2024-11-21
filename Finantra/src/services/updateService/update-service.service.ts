import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private apiUrl = `http://localhost:8080/api/v1/user/`;
  constructor(private httpClient:HttpClient) { }

  updateUser(email:String, user:User):Observable<any>{
    return this.httpClient.put(this.apiUrl+email, user);
  }
}
