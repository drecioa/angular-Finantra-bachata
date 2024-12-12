import { Component, AfterViewInit, OnInit  } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { BankService } from '@services/bankService/bank.service';
import { BankAccountDTO } from '@models/bank-account-dto';
import { CryptoService } from '@services/cryptoService/crypto.service';
import { Crypto } from '@models/crypto';

@Component({
  selector: 'app-estadistica-general',
  standalone: true,
  imports: [],
  templateUrl: './estadistica-general.component.html',
  styleUrl: './estadistica-general.component.css'
})
export class EstadisticaGeneralComponent implements OnInit {
  public chart: Chart | undefined;
  private updateInterval: any; 

  constructor(private bankService: BankService, private cryptoService: CryptoService) {}

  ngOnInit(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    this.updateChartData(); 
    this.startAutoUpdate(); 
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  updateChartData(): void {
    this.bankService.getAllAccounts().subscribe(
      (dataBank: BankAccountDTO[]) => {
        this.cryptoService.getAllCryptos().subscribe(
          (dataCrypto: Crypto[]) => {
            const totalBalanceBank = dataBank.reduce((sum, account) => sum + account.balance, 0);
            const totalValueCrypto = dataCrypto.reduce((sum, crypto) => sum + crypto.totalValue, 0);
            this.createChart(totalBalanceBank, totalValueCrypto);
          }
        );
      },
      (error) => {
        console.error('Error al obtener las cuentas bancarias:', error);
      }
    );
  }

  createChart (dataBank, dataCrypto): void {
    const canvas = document.getElementById("chart-general") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const data = {
          labels: ['Cuentas bancarias', 'Criptomonedas'],
          datasets: [
            {
              label: 'General',
              data: [dataBank, dataCrypto],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
              ],
              hoverOffset: 4,
            },
          ],
        };

        if (this.chart) {
          this.chart.data = data; 
          this.chart.update(); 
        } else {
          this.chart = new Chart(ctx, {
            type: 'pie' as ChartType,
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

  startAutoUpdate(): void {
    this.updateInterval = setInterval(() => {
      this.updateChartData(); 
    }, 100000000000000); 
  }
}
