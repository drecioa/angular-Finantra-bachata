import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/User';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecificStatisticsService {
  private apiHistoricalCryptoUrl = 'http://localhost:8080/api/v1/crypto/historical/';
  private apiHistoricalBankUrl = 'http://localhost:8080/api/v1/bank/accounts/historical/';
  protected user: User | null = null; 
  
  constructor(private http: HttpClient) {
    const userFromStorage = sessionStorage.getItem('user');
    
    if (userFromStorage) {
      this.user = JSON.parse(userFromStorage); 
    }
  }

  getHistoricalCrypto(coinId:string, fromDate:string, toDate:string): Observable<number[]> {
    return this.http.get<{ data: { dateTime: string; price: number }[] }>(
      `${this.apiHistoricalCryptoUrl}${coinId}?fromDate=${fromDate}&toDate=${toDate}`
    ).pipe(
      map((response) => {
        console.log(response);
        return response.data.map(item => item.price);
      }),
      catchError((error) => {
        console.error('Error al obtener los datos históricos:', error);
        return of([]); 
      })
    );
  }

  getHistoricalBank(accountId:string, fromDate:string, toDate:string): Observable<number[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
        email: this.user.email, 
        password: this.user.password 
    };

    return this.http.post<{ data: { dateTime: string; price: number }[] }>(
      `${this.apiHistoricalBankUrl}${accountId}?fromDate=${fromDate}&toDate=${toDate}`, body, {headers}
    ).pipe(
      map((response) => {
        console.log(response);
        return response.data.map(item => item.price);
      }),
      catchError((error) => {
        console.error('Error al obtener los datos históricos:', error);
        return of([]); 
      })
    );
  }
}
