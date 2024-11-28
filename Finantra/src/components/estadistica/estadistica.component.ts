import { Component } from '@angular/core';
import { BankAccountDTO } from '@models/bank-account-dto';
import { BankService } from '@services/bankService/bank.service';
import { CryptoService } from '@services/cryptoService/crypto.service';
import { Chart, ChartType } from 'chart.js';
import { Crypto } from '@models/crypto';
import { EspecificStatisticsService } from '@services/statisticsService/especificStadisticsService/especific-statistics.service';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css'
})
export class EstadisticaComponent {
  public chartCantidad: Chart | undefined;
  public chartCrypto: Chart | undefined;
  public chartBank: Chart | undefined;
  private accounts: BankAccountDTO[] = [];
  private cryptos: Crypto[] = [];
  private lastDays: string[] = this.getLastDays();
  private cryptoHistoricalData: { [key: string]: number[] } = {}; 
  private bankHistoricalData: { [key: string]: number[] } = {}; 

  constructor(private bankService: BankService, private cryptoService: CryptoService, private especificStattisticsService: EspecificStatisticsService) {}

  ngAfterViewInit(): void {
    this.bankService.getAllAccounts().subscribe(
      (dataBank: BankAccountDTO[]) => {
        this.accounts = dataBank;

        this.cryptoService.getAllCryptos().subscribe(
          (dataCrypto: Crypto[]) => {
            this.cryptos = dataCrypto;

            this.cryptos.forEach(crypto => this.getHistoricalCrypto(crypto.id));
            this.accounts.forEach(account => this.getHistoricalBank(account.accountId));

            this.createChartCantidad(); 
          }
        );
      },
      (error) => {
        console.error('Error al obtener las cuentas bancarias:', error);
      }
    );
  }

  createChartCantidad(): void {
    const canvas = document.getElementById("chart-cantidad") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const data = {
          labels: [""],
          datasets: [...this.getDatasetsBank(), ...this.getDatasetsCrypto("cantidad")],
        };

        if (this.chartCantidad) {
          this.chartCantidad.data = data;
          this.chartCantidad.update();
        } else {
          this.chartCantidad = new Chart(ctx, {
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

  createChartCrypto(): void {
    const canvas = document.getElementById("chart-crypto") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const data = {
          labels: this.lastDays.map(date => date.slice(5)),
          datasets: this.cryptos.map((crypto) => ({
            label: crypto.name,
            data: this.cryptoHistoricalData[crypto.id] || [], 
            fill: false,
            borderColor: this.generateRandomColor(),
            tension: 0.1
          })),
        };

        if (this.chartCrypto) {
          this.chartCrypto.data = data;
          this.chartCrypto.update();
        } else {
          this.chartCrypto = new Chart(ctx, {
            type: 'line' as ChartType,
            data: data,
          });
        }
      } else {
        console.error("No se pudo obtener el contexto 2D del canvas.");
      }
    } else {
      console.error("No se encontró el canvas con el ID 'chart'.");
    }
  }

  createChartBank(): void {
    const canvas = document.getElementById("chart-banco") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const data = {
          labels: this.lastDays.map(date => date.slice(5)),
          datasets: this.accounts.map((account) => ({
            label: account.bankName,
            data: this.bankHistoricalData[account.accountId] || [],
            fill: false,
            borderColor: this.generateRandomColor(),
            tension: 0.1
          })),
        };

        if (this.chartBank) {
          this.chartBank.data = data;
          this.chartBank.update();
        } else {
          this.chartCrypto = new Chart(ctx, {
            type: 'line' as ChartType,
            data: data,
          });
        }
      } else {
        console.error("No se pudo obtener el contexto 2D del canvas.");
      }
    } else {
      console.error("No se encontró el canvas con el ID 'chart'.");
    }
  }

  getLastDays(): string[] {
    const dates: string[] = [];
    const currentDate = new Date();

    for (let i = 0; i < 15; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);

      const formattedDate = date.toISOString().split('T')[0];
      dates.push(formattedDate);
    }

    return dates.reverse();
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

  getDatasetsCrypto(type: string): any[] {
    if (type == "cantidad") {
      return this.cryptos.map((crypto) => ({
        label: crypto.name,
        data: [crypto.totalValue],
        backgroundColor: this.accounts.map(() => this.generateRandomColor())
      }));
    } else {
      return this.cryptos.map((crypto) => ({
        label: crypto.name,
        data: this.cryptoHistoricalData[crypto.id], 
        fill: false,
        borderColor: this.generateRandomColor(),
        tension: 0.1
      }));
    }
  }

  getHistoricalCrypto(coinId: string): void {
    this.especificStattisticsService
      .getHistoricalCrypto(coinId, this.lastDays[0], this.lastDays[this.lastDays.length - 1])
      .subscribe((data) => {
        this.cryptoHistoricalData[coinId] = data;

        this.createChartCrypto();
        
      });
  }

  getHistoricalBank(accountId: string): void {
    this.especificStattisticsService
      .getHistoricalBank(accountId, this.lastDays[0], this.lastDays[this.lastDays.length - 1])
      .subscribe((data) => {
        this.bankHistoricalData[accountId] = data;

        this.createChartBank();
        
      });
  }

  
}
