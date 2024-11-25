import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralStatisticsService {

  private apiUrl = 'http://localhost:8080/api/v1/auth/register';

  constructor(private http: HttpClient) { }

  getGeneralValues (): Observable<any> {
    return this.http.post(this.apiUrl, {});
  }
}
