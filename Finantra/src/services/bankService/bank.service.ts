import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private apiGetAllUrl = 'http://localhost:8080/api/v1/bank/accounts';
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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      email: this.user.email, 
      password: this.user.password 
    };

    return this.http.post(`${this.apiConnectUrl}?code=${code}`, body, { headers });
  }

  saveAccount(account:BankAccountDTO): Observable<any> {
    if (!this.user) {
      console.error('No se ha encontrado el usuario en sessionStorage');
      return new Observable(); 
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      bankAccountDTO: {
        accountId: account.accountId,
        providerId: account.providerId,
        bankName: account.bankName,
        iban: account.iban,
        currency: account.currency,
        balance: account.balance,
        notes: account.notes
      },
      loginDTO: {
        email: this.user.email, 
        password: this.user.password 
      }
    };

    return this.http.post(this.apiSaveUrl, body, { headers });
  }

  getAllAccounts(): Observable<BankAccountDTO[]> {
    if (!this.user || !this.user.password) {
      console.error('La contraseña no está disponible.');
      return new Observable(); 
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
        email: this.user.email, 
        password: this.user.password 
    };

    return this.http.post<any>(this.apiGetAllUrl, body, { headers }).pipe(
      map(response => response.data as BankAccountDTO[])
    );
  }
  
}
