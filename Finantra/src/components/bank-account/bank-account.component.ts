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
  protected targetAccount!:Bank;
  protected accounts:Bank[]=[
    { accountId: "id",
      providerId: "providerId",
      bankName: "bankName",
      iban: "iban",
      currency: "currency?",
      balance: 0,
      notes: "Escrituras ancestrales"}
  ];

  constructor (private utils:UtilsService, /*private bankService:BankService*/){}

  ngOnInit(): void {
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
