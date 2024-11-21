import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccountDTO } from '@models/bank-account-dto';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiUrl = 'http://localhost:8080/api/v1/bank/connect'; // URL de la API

  constructor(private http: HttpClient) {}

  // Método para realizar el POST con parámetros en la URL y en el cuerpo
  showSelectionAccount(code: string, email: string, password: string): Observable<any> {
    // Definimos el cuerpo de la solicitud (email y password)
    const body = {
      email: email,
      password: password
    };

    // Configuramos los encabezados (por ejemplo, especificando JSON)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Realizamos la petición POST con el parámetro code en la URL y el cuerpo con email y password
    return this.http.post(`${this.apiUrl}?code=${code}`, body, { headers });
  }
}
