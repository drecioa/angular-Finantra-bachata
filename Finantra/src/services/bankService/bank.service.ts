import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccountDTO } from '@models/bank-account-dto';
import { User } from '@models/User';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiConnectUrl = 'http://localhost:8080/api/v1/bank/connect'; 
  private apiSaveUrl = 'http://localhost:8080/api/v1/bank/save';
  private apiGetUrl = 'http://localhost:8080/api/v1/bank/accounts';  
  private apiUpdateUrl= 'http://localhost:8080/api/v1/bank/accounts/'
  private apiDeleteUrl= 'http://localhost:8080/api/v1/bank/accounts/delete/'
  private apiTransacctionUrl= 'http://localhost:8080/api/v1/bank/accounts/transactions/'
  private apis="http://localhost:8080/api/v1/bank/accounts/"
  protected user: User | null = null; 
  
  constructor(private http: HttpClient) {
    const userFromStorage = sessionStorage.getItem('user');
    
    if (userFromStorage) {
      this.user = JSON.parse(userFromStorage); 
    }
  }

  showSelectionAccount(code: string): Observable<any> {
    if (!this.user) {
      console.error('No se ha encontrado el usuario en sessionStorage');
      return new Observable(); 
    }

    let token: string = sessionStorage.getItem('JWT') || "";

    return this.http.get(`${this.apiConnectUrl}?code=${code}`, { headers: new HttpHeaders({ 'Authorization': token }) });
  }

  saveAccount(account:BankAccountDTO): Observable<any> {
    if (!this.user) {
      console.error('No se ha encontrado el usuario en sessionStorage');
      return new Observable(); 
    }

    let token: string = sessionStorage.getItem('JWT') || "";

    let httpOptionsJson = {
      headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': token }),
    }

    const body = {
      bankAccountDTO: {
        accountId: account.accountId,
        providerId: account.providerId,
        bankName: account.bankName,
        iban: account.iban,
        currency: account.currency,
        balance: account.balance,
        notes: account.notes
      }
    };

    return this.http.post(this.apiSaveUrl, body,  httpOptionsJson );
  }

  getAllAccounts(): Observable<BankAccountDTO[]> {
    if (!this.user || !this.user.password) {
      console.error('La contraseña no está disponible.');
      return new Observable(); 
    }

    let token: string = sessionStorage.getItem('JWT') || "";
   
    return this.http.post<any>(this.apiGetUrl, { headers: new HttpHeaders({ 'Authorization': token }) }).pipe(
      map(response => response.data as BankAccountDTO[])
    );
  }
  
  getAccounts(): Observable<any>{
    let token: string = sessionStorage.getItem('JWT') || "";
    return this.http.get(this.apiGetUrl, { headers: new HttpHeaders({ 'Authorization': token }) });
  }

  deleteAccount(accountId:string):Observable<any>{
    let token: string = sessionStorage.getItem('JWT') || "";
    return this.http.get(this.apiDeleteUrl+accountId, { headers: new HttpHeaders({ 'Authorization': token }) });
  }

  updateAccount(bankAccountDTO: BankAccountDTO): Observable<any> {

    let token: string = sessionStorage.getItem('JWT') || "";

    let httpOptionsJson = {
      headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': token }),
    }

    const body = {
      bankAccountDTO: {
        accountId: bankAccountDTO.accountId,
        bankName: bankAccountDTO.bankName,
        iban: bankAccountDTO.iban,
        currency: bankAccountDTO.currency,
        balance: bankAccountDTO.balance,
        notes: bankAccountDTO.notes
      }
    };

    console.log("Body enviado al API:\n", JSON.stringify(body, null, 2));
    console.log("--->"+this.apiUpdateUrl + bankAccountDTO.accountId);
    return this.http.patch(this.apiUpdateUrl + bankAccountDTO.accountId, JSON.stringify(body), httpOptionsJson);
  }

  temp(id:String):Observable<any>{
    let token: string = sessionStorage.getItem('JWT') || "";
    return this.http.get(this.apis+id, { headers: new HttpHeaders({ 'Authorization': token }) });
  }

  getAllTransactions(accountId:string, from:string, to:string):Observable<any>{
    let token: string = sessionStorage.getItem('JWT') || "";
    const params = new HttpParams()
    .set('from', from)
    .set('to', to);
    return this.http.get<any>(this.apiTransacctionUrl+accountId, { headers: new HttpHeaders({ 'Authorization':token }), params: params });
  }

}
