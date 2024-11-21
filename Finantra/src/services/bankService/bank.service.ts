import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiUrl="http://127.0.0.1:8080/api/v1/auth/login"; /**introduce la url */
  constructor(private http: HttpClient) { }

  
}
