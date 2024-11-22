import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Bank } from '@models/Bank';
import { BankService } from '@services/bankService/bank.service';
import { UtilsService } from '@services/utilsService/utils.service';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.css'
})
export class BankAccountComponent implements OnInit{
  //No funciona por ahora*******************************************************
  protected targetAccount:Bank={ 
    accountId: "",
    providerId: "",
    bankName: "",
    iban: "",
    currency: "",
    balance: 0,
    notes: ""};
  protected accounts:Bank[]=[];

  constructor (private utils:UtilsService, /*private bankService:BankService*/){}

  ngOnInit(): void {
    //temporal
    this.accounts=[
      { accountId: "id",
        providerId: "providerId",
        bankName: "bankName",
        iban: "iban",
        currency: "currency?",
        balance: 0,
        notes: "Escrituras ancestrales"},
      { accountId: "id2",
        providerId: "providerId2",
        bankName: "bankName2",
        iban: "iban2",
        currency: "currency?2",
        balance: 0,
        notes: "Escrituras ancestrales segunda parte"}
    ]
      /*
      this.bankService.bank.subscribe(
        (data)=>{
          this.accounts=JSON.parse(data);
        }, (error)=>{
          console.error(error);
        }
      )*/
  }
  //WARNING: Aun no funciona------------------------------------------------------


  setTargetAccount(cuenta: Bank):void{
    this.targetAccount=cuenta;
  }
}
