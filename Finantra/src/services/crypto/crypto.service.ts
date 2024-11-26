import { Injectable } from '@angular/core';
import { User } from '@models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, catchError, of } from 'rxjs';
import { CryptoDto } from '@models/crypto-dto';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {

  private apiSearchUrl = 'http://localhost:8080/api/v1/crypto/search?query=';
  private apiSaveUrl = 'http://localhost:8080/api/v1/crypto/add';

  protected user: User | null = null; 

  constructor(private http: HttpClient) {
    const userFromStorage = sessionStorage.getItem('user');
    
    if (userFromStorage) {
      this.user = JSON.parse(userFromStorage); 
    }
  }

  searchCryptos (query:string): Observable<CryptoDto[]> {
    return this.http.get<{ data: CryptoDto[] }>(`${this.apiSearchUrl}${query}`).pipe(
      map((response) => response.data || []),
      catchError((error) => {
        console.error('Error al buscar criptomonedas:', error);
        return of([]); 
      })
    );
  }

  saveCrypto (parameters:string): Observable<any> {
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

    return this.http.post(`${this.apiSaveUrl}${parameters}`, body, { headers });
  }
}
