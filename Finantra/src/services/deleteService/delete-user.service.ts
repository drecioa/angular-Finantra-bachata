import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '@models/loginDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  private apiDeleteUser="http://localhost:8080/api/v1/user/delete";
  constructor(private http:HttpClient) { }

  deleteUser(login:LoginDto):Observable<any>{
    console.log(login)
    return this.http.post(this.apiDeleteUser, login);
  }
}
