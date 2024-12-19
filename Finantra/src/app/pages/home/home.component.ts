import { CommonModule } from '@angular/common';
import { Component, inject, Input, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { NotificationComponent } from "../../../components/notification/notification.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PresentationComponent } from "../../../components/presentation/presentation.component";
import { Head } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent, NotificationComponent, PresentationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  finantraHomeText:string = "Saludos---Finantra es la aplicación definitiva para gestionar todas tus finanzas en un solo lugar. Conecta tus cuentas bancarias y monederos de criptomonedas para obtener una visión completa de tu situación financiera. Analiza tus ingresos, gastos e inversiones con estadísticas y gráficos fáciles de entender, diseñados para ayudarte a tomar decisiones inteligentes. Finantra simplifica tus finanzas y te da el control total de tu dinero, estés donde estés.";
  finantraHomeText2:string = "Esto es una prueba---->Finantra es la aplicación definitiva para gestionar todas tus finanzas en un solo lugar. Conecta tus cuentas bancarias y monederos de criptomonedas para obtener una visión completa de tu situación financiera. Analiza tus ingresos, gastos e inversiones con estadísticas y gráficos fáciles de entender, diseñados para ayudarte a tomar decisiones inteligentes. Finantra simplifica tus finanzas y te da el control total de tu dinero, estés donde estés.";
  
  finantraText:string="";

  

  srcFinantra1:string="https://static.wikia.nocookie.net/memes-pedia/images/d/df/Nada.png/revision/latest?cb=20201119214705&path-prefix=es";
  srcFinantra2:string="https://cdn.capitalradio.es/embed/67e5cec58b4a5476358f53773b72c059b1591979001/stonks.jpg?imagick=1&size=500";
  typeInformation:string = 'cuentas bancarias';
  infoName:string='';
  dialog = inject(MatDialog);
  dialogRef: MatDialogRef<any>;
  
  protected textReceived?:string;
  constructor(private zone: NgZone){}

  search(infoName:string):void {
    //Aquí irá la lógica para buscar una cuenta solo con el nombre de la cuenta
  }

  openDialog(): void {
    this.zone.run(()=>{
      this.dialogRef = this.dialog.open(NotificationComponent, {
        data: {title: "Titulo Modal", message: "Cuerpo del modal"},
      });
      this.dialogRef.componentInstance.title = "Titulo Modal";
      this.dialogRef.componentInstance.message = "Mensaje Modal";
    });
  }

  message(value:string){
    this.textReceived=value;
  }

}
