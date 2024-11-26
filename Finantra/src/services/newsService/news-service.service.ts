import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private searchNewsApi="http://localhost:8080/api/v1/new/topics";
  constructor(private httpClient:HttpClient) { }

  
  getTopics():Observable<any>{
    return this.httpClient.get(this.searchNewsApi);
  }
}
