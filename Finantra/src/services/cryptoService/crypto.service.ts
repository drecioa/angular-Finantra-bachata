import { Injectable } from '@angular/core';
import { User } from '@models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, catchError, of } from 'rxjs';
import { CryptoDto } from '@models/crypto-dto';
import { Crypto } from '@models/crypto';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {

  private apiSearchUrl = 'http://localhost:8080/api/v1/crypto/search?query=';
  private apiSaveUrl = 'http://localhost:8080/api/v1/crypto/add';
  private apiGetAllUrl = 'http://localhost:8080/api/v1/crypto';
  private apiDeleteUrl = 'http://localhost:8080/api/v1/crypto/delete/';

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

  getAllCryptos (): Observable<Crypto[]> {
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

    return this.http.post<{ data: Crypto[] }>(this.apiGetAllUrl, body, { headers }).pipe(
      map((response) => response.data || []), 
      catchError((error) => {
        console.error('Error al obtener todas las criptomonedas:', error);
        return of([]);
      })
    );
  }

  deleteCrypto (coinId:string): Observable<any> {
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

    return this.http.post(`${this.apiDeleteUrl}${coinId}`, body, { headers }).pipe(
          catchError((error) => {
          console.error('Error al eliminar la criptomoneda:', error);
          return of(null); }));
  }

  
}
