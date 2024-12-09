import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '@models/loginDto';
import { User } from '@models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private apiUrl = `http://localhost:8080/api/v1/user`;
  constructor(private httpClient:HttpClient) { }

  updateUser(updateDTO:User):Observable<any>{
    let token: string = sessionStorage.getItem('JWT') || "";    
    return this.httpClient.post(this.apiUrl, updateDTO, { headers: new HttpHeaders({ 'Authorization': token }) });
  }

  //getSolution(userId:string ,exerciseId: string): Observable<SolutionObjResponse> {
  //  let token: string = localStorage.getItem('JWT') || "";
  //  return this.http.get<SolutionObjResponse>(`${this.apiUrl}/${exerciseId}/${userId}`, { headers: new HttpHeaders({ 'Authorization': token }) });
  //}


  //postProblem(createexerciserequest:CreateExerciseRequest): Observable<ExerciseResponse> {
  //  let token: string = localStorage.getItem('JWT') || "";
  //
  //  return this.http.post<ExerciseResponse>(`${this.apiUrl}/createExercise`, createexerciserequest,{ headers: new HttpHeaders({ 'Authorization': token }) });  
  //}
}
