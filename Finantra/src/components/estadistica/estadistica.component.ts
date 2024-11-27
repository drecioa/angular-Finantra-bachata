import { Component } from '@angular/core';
import { BankAccountDTO } from '@models/bank-account-dto';
import { BankService } from '@services/bankService/bank.service';
import { CryptoService } from '@services/cryptoService/crypto.service';
import { Chart, ChartType } from 'chart.js';
import { Crypto } from '@models/crypto';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css'
})
export class EstadisticaComponent {
  public chart: Chart | undefined;
  private accounts: BankAccountDTO[] = [];
  private cryptos: Crypto[] = [];

  constructor(private bankService: BankService, private cryptoService: CryptoService) {}

  ngAfterViewInit(): void {
    this.bankService.getAllAccounts().subscribe(
      (dataBank: BankAccountDTO[]) => {
        this.accounts = dataBank;

        this.cryptoService.getAllCryptos().subscribe(
          (dataCrypto: Crypto[]) => {
            this.cryptos = dataCrypto;

            this.createChart();
          }
        );
      },
      (error) => {
        console.error('Error al obtener las cuentas bancarias:', error);
      }
    );
  }

  createChart(): void {
    const canvas = document.getElementById("chart") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const data = {
          labels: [""],
          datasets: [...this.getDatasetsBank(),...this.getDatasetsCrypto()], 
        };

        if (this.chart) {
          this.chart.data = data;
          this.chart.update();  
        } else {
          this.chart = new Chart(ctx, {
            type: 'bar' as ChartType,
            data: data,
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            },
          });
        }
      } else {
        console.error("No se pudo obtener el contexto 2D del canvas.");
      }
    } else {
      console.error("No se encontró el canvas con el ID 'chart'.");
    }
  }

  getLabelsBanks(): string[] {
    return this.accounts.map(account => account.bankName);
  }

  getLabelsCryptos(): string[] {
    return this.cryptos.map(crypto => crypto.name);
  }

  generateRandomColor(): string {
    const randomColorR = Math.floor(Math.random() * 255);
    const randomColorB = Math.floor(Math.random() * 255);
    const randomColorG = Math.floor(Math.random() * 255);
    return `rgb(${randomColorR}, ${randomColorG}, ${randomColorB})`;
  }
  
  getDatasetsBank(): any[] {
    return this.accounts.map((account) => ({
      label: account.bankName,
      data: [account.balance], 
      backgroundColor: this.accounts.map(() => this.generateRandomColor())
    }));
  }

  getDatasetsCrypto(): any[] {
    return this.cryptos.map((crypto) => ({
      label: crypto.name,
      data: [crypto.totalValue], 
      backgroundColor: this.accounts.map(() => this.generateRandomColor())
    }));
  }

}
