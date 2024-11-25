import { Component, AfterViewInit  } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-estadistica-general',
  standalone: true,
  imports: [],
  templateUrl: './estadistica-general.component.html',
  styleUrl: './estadistica-general.component.css'
})
export class EstadisticaGeneralComponent implements AfterViewInit {
  public chart: Chart | undefined;

  ngAfterViewInit(): void {
    const canvas = document.getElementById("chart-general") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const data = {
          labels: ['Cuentas bancarias', 'Criptomonedas'],
          datasets: [
            {
              label: 'General',
              data: [300, 50],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
              ],
              hoverOffset: 4,
            },
          ],
        };

        this.chart = new Chart(ctx, {
          type: 'pie' as ChartType,
          data: data,
        });
      } else {
        console.error("No se pudo obtener el contexto 2D del canvas.");
      }
    } else {
      console.error("No se encontró el canvas con el ID 'chart'.");
    }
  }

}
