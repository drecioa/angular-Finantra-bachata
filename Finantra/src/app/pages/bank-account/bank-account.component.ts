import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Bank } from '@models/Bank';
import { BankAccountDTO } from '@models/bank-account-dto';
import { LoginDto } from '@models/loginDto';
import { Transaction } from '@models/Transaction';
import { User } from '@models/User';
import { BankService } from '@services/bankService/bank.service';
import { UtilsService } from '@services/utilsService/utils.service';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.css'
})
export class BankAccountComponent implements OnInit{
  protected loading:boolean=true;
  protected fromDat:string;
  protected toDat:string;

  protected user: User={
    lastName: "Doe",
    firstName:"Jonh",
    email:"",
    password:""
  };
  protected targetAccount:Bank={ 
    accountId: "",
    providerId: "",
    bankName: "",
    iban: "",
    currency: "",
    balance: 0,
    notes: ""};
  protected accounts:Bank[]=[];
  protected accountTrasactions:Transaction[]=[];
  constructor (private utils:UtilsService, private bankService:BankService){}

  ngOnInit(): void {
    this.utils.auth.data.subscribe(
      (data)=>{
          this.user= JSON.parse(data);
      }
    );
    this.getCuentas(new LoginDto(this.user.email, this.user.password));
  }

  getCuentas(login: LoginDto):void{
    this.loading=true;
    this.bankService.getAccounts(login).subscribe(
      (response)=>{
        if (typeof response.data === 'string') {
          this.accounts = JSON.parse(response.data);
        } else {
          this.accounts = response.data;
        }

        this.loading=false;
      },(error)=>{
        console.error(error);
        this.loading=false;
      }
    )
  }

  setTargetAccount(cuenta: Bank):void{
    this.targetAccount=cuenta;
  }

  onDelete(accountId:string):void{
    this.bankService.deleteAccount(accountId, 
      new LoginDto(this.user.email, this.user.password)
    ).subscribe((data)=>{
      console.log(data)
    }, (error)=>{
      console.error(error);
    });
    document.getElementById("miraCierrame2")?.click();

    this.setEmptyTarget();
    setTimeout(()=>{
      this.getCuentas(new LoginDto(this.user.email, this.user.password));
    }, 1000)
    ;
  }
  
  openTrasactions(from:string, to:string){
    if(from&&to&&this.validateDates(from, to)){

      const containerMain=document.getElementById("bankAccountMainSection");

      this.setFromDate(from);
      this.setToDate(to);

      let botonCerrar=document.getElementById("miraCierrame3");
      botonCerrar.click();

      let boton=document.createElement("button");
      boton.style.display="none";
      boton.type="button";
      boton.setAttribute("data-bs-toggle", "modal");
      boton.setAttribute("data-bs-target", "#trasaction");
      

      containerMain.appendChild(boton);
      boton.click();

      this.setTransactions();
    }else{
      alert("completa todos los campos de \"fechas\"\ny en el orden correcto")
    }
  }
  //No funciona por ahora*******************************************************
  onUpdate(form: NgForm):void{
    console.log(form.value);
    
    this.bankService.updateAccount(
      new BankAccountDTO(
        this.targetAccount.accountId,
        this.targetAccount.providerId,
        form.value.bankName,
        this.targetAccount.iban,
        this.targetAccount.currency,
        this.targetAccount.balance,
        form.value.notes
      ),
      new LoginDto(this.user.email, this.user.password)
    ).subscribe((data)=>{
      console.log(data);
      console.log("operacion realizado correctamente");
      
    }, (error)=>{console.error(error);
    })
    document.getElementById("miraCierrame")?.click();
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.bankService.temp(this.targetAccount.accountId, new LoginDto(this.user.email, this.user.password)).subscribe((data)=>{
      console.log("actualizado?: "+JSON.stringify(data));
    }, (error)=>{console.error("madre mia")});
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.setEmptyTarget();
    setTimeout(()=>{
      this.getCuentas(new LoginDto(this.user.email, this.user.password));
    }, 1000)
  }
  //WARNING: Aun no funciona------------------------------------------------------

  setEmptyTarget():void{
    this.targetAccount={
      accountId: "",
      providerId: "",
      bankName: "",
      iban: "",
      currency: "",
      balance: 0,
      notes: ""};
  }

  setTransactions():void{
    this.bankService.getAllTransactions(this.targetAccount.accountId, 
                                        new LoginDto(this.user.email, this.user.password), 
                                        this.fromDat, 
                                        this.toDat).subscribe(
                                          (data)=>{
                                            this.accountTrasactions=data.data;
                                          }, (error)=>{console.error(error);
                                          }
                                        )
  }
  setToDate(newValue:string):void{
    this.toDat=newValue;
  }
  setFromDate(newValue:string):void{
    this.fromDat=newValue;
  }

  validateDates(fromDate:string, toDate:string):boolean {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (from > to) {
      return false
    }
    return true
  }
}
