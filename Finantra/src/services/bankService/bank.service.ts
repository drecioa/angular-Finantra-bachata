import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BankAccountDTO } from '@models/bank-account-dto';
import { User } from '@models/User';
import { LoginDto } from '@models/loginDto';
import { Bank } from '@models/Bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiConnectUrl = 'http://localhost:8080/api/v1/bank/connect'; 
  private apiSaveUrl = 'http://localhost:8080/api/v1/bank/save';
  private apiGetUrl = 'http://localhost:8080/api/v1/bank/accounts';  
  private apiUpdateUrl= 'http://localhost:8080/api/v1/bank/accounts/'
  private apiDeleteUrl= 'http://localhost:8080/api/v1/bank/accounts/delete/'

  private apis="http://localhost:8080/api/v1/bank/accounts/"
  protected user: User | null = null; 
  
  constructor(private http: HttpClient) {
    // Obtener el usuario de sessionStorage
    const userFromStorage = sessionStorage.getItem('user');
    
    if (userFromStorage) {
      this.user = JSON.parse(userFromStorage); // Parsear el JSON y asignarlo a la variable user
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
  
  getAccounts(login: LoginDto): Observable<any>{
    return this.http.post(this.apiGetUrl, login);
  }

  deleteAccount(accountId:string, loginDto:LoginDto):Observable<any>{
    return this.http.post(this.apiDeleteUrl+accountId, loginDto);
  }

updateAccount(bankAccountDTO: BankAccountDTO, loginDTO: LoginDto): Observable<any> {
  const body = {
    bankAccountDTO: {
      accountId: bankAccountDTO.accountId,
      bankName: bankAccountDTO.bankName,
      iban: bankAccountDTO.iban,
      currency: bankAccountDTO.currency,
      balance: bankAccountDTO.balance,
      notes: bankAccountDTO.notes
    },
    loginDTO: {
      email: loginDTO.email,
      password: loginDTO.password
    }
  };

  console.log("Body enviado al API:\n", JSON.stringify(body, null, 2));
  console.log("--->"+this.apiUpdateUrl + bankAccountDTO.accountId);
  return this.http.put(this.apiUpdateUrl + bankAccountDTO.accountId, JSON.stringify(body),  { headers: { 'Content-Type': 'application/json' }});
}

temp(id:String, login: LoginDto):Observable<any>{
  return this.http.post(this.apis+id, login);
}

}
