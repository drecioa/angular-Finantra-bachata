import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterDTO {
  email:string;
  password:string;
  firstName:string;
  lastName:string;
}

@Injectable()
export class RegisterService {

  private apiUrl = 'http://localhost:8080/api/v1/auth/register';

  constructor(private http: HttpClient) { }

  register (registerDTO:RegisterDTO): Observable<any> {
    return this.http.post(this.apiUrl, registerDTO);
  }
}
