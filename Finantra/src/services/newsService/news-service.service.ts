import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '@models/loginDto';
import { Topic } from '@models/Topic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private searchNewsApi="http://localhost:8080/api/v1/new/topics";
  private getTopicsApi="http://localhost:8080/api/v1/user/topics";
  private updateTopicsApi="http://localhost:8080/api/v1/user/topics/update";
  private getNewsApi="http://localhost:8080/api/v1/new/topics-page";
  

  constructor(private httpClient:HttpClient) { }

  
  getTopics():Observable<any>{
    return this.httpClient.get(this.searchNewsApi);
  }

  getUserTopics():Observable<any>{
    let token: string = sessionStorage.getItem('JWT') || "";  
    return this.httpClient.get(this.getTopicsApi, { headers: new HttpHeaders({ 'Authorization': token }) });
  }

  
  saveTopics( newTopics:Topic[]):Observable<any>{
    let token: string = sessionStorage.getItem('JWT') || "";  
    let httpOptionsJson = {
      headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': token }),
    }
    return this.httpClient.post(this.updateTopicsApi,  newTopics, httpOptionsJson);
  }

  getNews(page: number, size: number, login: LoginDto): Observable<any> {
    return this.httpClient.post<any>(`${this.getNewsApi}?page=${page}&size=${size}`, login);
  }
}
