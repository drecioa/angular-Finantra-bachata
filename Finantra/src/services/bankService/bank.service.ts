import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccountDTO } from '@models/bank-account-dto';
import { User } from '@models/User';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiUrl = 'http://localhost:8080/api/v1/bank/connect'; // URL de la API
  protected user: User | null = null; // Asegúrate de que user sea del tipo correcto

  constructor(private http: HttpClient) {
    // Obtener el usuario de sessionStorage
    const userFromStorage = sessionStorage.getItem('user');
    
    if (userFromStorage) {
      this.user = JSON.parse(userFromStorage); // Parsear el JSON y asignarlo a la variable user
    }
  }

  showSelectionAccount(code: string): Observable<any> {
    if (!this.user) {
      console.error('No se ha encontrado el usuario en sessionStorage');
      return new Observable(); 
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      email: this.user.email, 
      password: this.user.password 
    };

    return this.http.post(`${this.apiUrl}?code=${code}`, body, { headers });
  }

  
}
