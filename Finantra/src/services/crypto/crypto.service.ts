import { Injectable } from '@angular/core';
import { User } from '@models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CryptoDto } from '@models/crypto-dto';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {

  private apiSearchUrl: 'http://localhost:8080/api/v1/crypto/search?query='
  protected user: User | null = null; 

  constructor(private http: HttpClient) {
    const userFromStorage = sessionStorage.getItem('user');
    
    if (userFromStorage) {
      this.user = JSON.parse(userFromStorage); 
    }
  }

  searchCryptos (query:string): Observable<CryptoDto[]> {
    return this.http.get<{ data: CryptoDto[] }>(this.apiSearchUrl+query).pipe(map(response => response.data as CryptoDto[]));
  }
}
