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

  private apiGetAllUrl = 'http://localhost:8080/api/v1/crypto';   
  private apiDeleteUrl = 'http://localhost:8080/api/v1/crypto/delete/';
  private apiSaveUrl = 'http://localhost:8080/api/v1/crypto/add';
  private apiSearchUrl = 'http://localhost:8080/api/v1/crypto/search?query=';

  protected user: User | null = null; 
  
  constructor(private http: HttpClient) {
    const userFromStorage = sessionStorage.getItem('user');
    
    if (userFromStorage) {
      this.user = JSON.parse(userFromStorage); 
    }
  }

  getAllCryptos (): Observable<Crypto[]> {
    if (!this.user) {
      console.error('No se ha encontrado el usuario en sessionStorage');
      return new Observable(); 
    }

    let token: string = sessionStorage.getItem('JWT') || "";

    let httpOptionsJson = {
      headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': token }),
    }

    return this.http.get<{ data: Crypto[] }>(this.apiGetAllUrl,  httpOptionsJson).pipe(
      map((response) => response.data as Crypto[]), 
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

    let token: string = sessionStorage.getItem('JWT') || "";  


    let httpOptionsJson = {
      headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': token }),
    }
    
    return this.http.delete(`${this.apiDeleteUrl}${coinId}`,  httpOptionsJson).pipe(
          catchError((error) => {
          console.error('Error al eliminar la criptomoneda:', error);
          return of(null); }));
  }

  saveCrypto (parameters:string): Observable<any> {
    if (!this.user) {
      console.error('No se ha encontrado el usuario en sessionStorage');
      return new Observable(); 
    }

    let token: string = sessionStorage.getItem('JWT') || "";

    let headers = {
       headers: new HttpHeaders({ 'Authorization': token }) 
    }

    let finalURL :string =  this.apiSaveUrl+parameters;

    return this.http.post(finalURL, {}, headers );
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
}
