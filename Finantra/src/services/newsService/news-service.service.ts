import { HttpClient } from '@angular/common/http';
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

  getUserTopics(login: LoginDto):Observable<any>{
    return this.httpClient.post(this.getTopicsApi, login);
  }

  saveTopics(loginDTO:LoginDto, newTopics:Topic[]):Observable<any>{
    return this.httpClient.post(this.updateTopicsApi, {loginDTO, newTopics})
  }

  getNews(page: number, size: number, login: LoginDto): Observable<any> {
    return this.httpClient.post<any>(`${this.getNewsApi}?page=${page}&size=${size}`, login);
  }
}
