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

  protected user: User | null = null; 
  
  //No funciona por ahora*******************************************************
  private behavior=new BehaviorSubject<any>(this.getAccounts(new LoginDto("", "")));
  bank=this.behavior.asObservable();
  //WARNING: Aun no funciona------------------------------------------------------

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
  
  //No funciona por ahora*******************************************************
  private getAccounts(login: LoginDto): Observable<any>{
    const params= new HttpParams()
      .set("email", login.email)
      .set("password", login.password);
    return this.http.get(this.apiGetUrl, {params});//???????????????
  }

  refreshAccounts(login: LoginDto):void{
    this.getAccounts(login).subscribe(
      (data)=>{
        this.behavior.next(data.data);
      }, (error)=>{
        console.error(error);
      }
    )
  }
  //WARNING: Aun no funciona------------------------------------------------------
}
