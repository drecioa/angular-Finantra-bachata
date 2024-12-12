import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BankService } from '@services/bankService/bank.service';
import { BankAccountDTO } from '@models/bank-account-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilsService } from '@services/utilsService/utils.service';
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit{
  code: string | null = null;
  bankAccounts: BankAccountDTO[] = []; 
  selectedAccounts: boolean[] = []; 

  constructor(private route: ActivatedRoute, private bankService: BankService, private utils: UtilsService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'] || null;
      if (this.code) {
        this.bankService.showSelectionAccount(this.code).subscribe(
          (response) => {
            console.log('Respuesta completa', response);
            this.bankAccounts = response.data;
            this.selectedAccounts = new Array(this.bankAccounts.length).fill(false);
          },
          (error) => {
            console.error('Error al obtener las cuentas:', error);
          }
        );
      } else {
        console.log('No se recibió código');
      }
    });
  }

  addSelectedAccounts(): void {
    const selectedAccounts = this.bankAccounts.filter((account, index) => this.selectedAccounts[index]);

    if (selectedAccounts.length > 0) {
      for (let i = 0; i < selectedAccounts.length; i++) {
        // Aquí llamamos a la función del servicio para cada cuenta seleccionada
        this.bankService.saveAccount(selectedAccounts[i]).subscribe(
          (response) => {
            console.log('Cuenta procesada correctamente:', response);
            this.utils.redirect.navigate(["/home"]);
          },
          (error) => {
            console.error('Error al procesar la cuenta:', error);
          }
        );
      }
    } else {
      console.log('No se han seleccionado cuentas.');
    }
  }
}
