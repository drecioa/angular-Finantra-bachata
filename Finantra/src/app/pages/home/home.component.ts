import { CommonModule } from '@angular/common';
import { Component, inject, Input, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { NotificationComponent } from "../../../components/notification/notification.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent, NotificationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  finantraHomeText:string = "Finantra es la aplicación definitiva para gestionar todas tus finanzas en un solo lugar. Conecta tus cuentas bancarias y monederos de criptomonedas para obtener una visión completa de tu situación financiera. Analiza tus ingresos, gastos e inversiones con estadísticas y gráficos fáciles de entender, diseñados para ayudarte a tomar decisiones inteligentes. Finantra simplifica tus finanzas y te da el control total de tu dinero, estés donde estés.";
  typeInformation:string = 'cuentas bancarias';
  infoName:string='';
  dialog = inject(MatDialog);
  dialogRef: MatDialogRef<any>;
  
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

 

}
