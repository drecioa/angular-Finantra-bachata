import { Component } from '@angular/core';
import { PresentationComponent } from "../../../../../../components/presentation/presentation.component";

@Component({
  selector: 'app-session-main-page',
  standalone: true,
  imports: [PresentationComponent],
  templateUrl: './session-main-page.component.html',
  styleUrl: './session-main-page.component.css'
})
export class SessionMainPageComponent {
  protected text:string="1 Finantra es la aplicación definitiva para gestionar todas tus finanzas en un solo lugar. Conecta tus cuentas bancarias y monederos de criptomonedas para obtener una visión completa de tu situación financiera. Analiza tus ingresos, gastos e inversiones con estadísticas y gráficos fáciles de entender, diseñados para ayudarte a tomar decisiones inteligentes. Finantra simplifica tus finanzas y te da el control total de tu dinero, estés donde estés."
}
