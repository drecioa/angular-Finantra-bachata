import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/User';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecificStatisticsService {
  private apiHistoricalUrl = 'http://localhost:8080/api/v1/crypto/historical/';

  constructor(private http: HttpClient) {
  }

  getHistorical(coinId:string, fromDate:string, toDate:string): Observable<number[]> {
    return this.http.get<{ data: { dateTime: string; price: number }[] }>(
      `${this.apiHistoricalUrl}${coinId}?fromDate=${fromDate}&toDate=${toDate}`
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
