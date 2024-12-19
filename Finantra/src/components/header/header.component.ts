import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from '@services/utilsService/utils.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '@models/User';
import { EstadisticaGeneralComponent } from 'src/app/pages/estadistica-general/estadistica-general.component';
import { CustomTranslationLoaderComponent } from '@components/custom-translation-loader/custom-translation-loader.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, EstadisticaGeneralComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{
  protected user: User={
    lastName: "Doe",
    firstName:"Jonh",
    email:"",
    password:""
  };

  private language:string="es-ES";
  protected srcFlag:string;
  public finantraText:string ="Saludos---Finantra es la aplicación definitiva para gestionar todas tus finanzas en un solo lugar. Conecta tus cuentas bancarias y monederos de criptomonedas para obtener una visión completa de tu situación financiera. Analiza tus ingresos, gastos e inversiones con estadísticas y gráficos fáciles de entender, diseñados para ayudarte a tomar decisiones inteligentes. Finantra simplifica tus finanzas y te da el control total de tu dinero, estés donde estés.";

  constructor (private util:UtilsService, translate: CustomTranslationLoaderComponent){}

  logout():void{
    this.util.auth.logout();
    this.util.redirect.navigate(["/auth"]);
  }

  ngOnInit(): void {
    this.changeFlag(this.language);
    this.util.auth.data.subscribe(
      (data)=>{
        this.user= JSON.parse(data);
      }
    );
  }


  aux():void{
    let select=document.getElementById("language") as HTMLSelectElement;
    this.language=select.options[select.selectedIndex].value
    this.changeFlag(this.language);
  }

  changeFlag(text:string):void{
    switch(text){
      case "es-ES":
        this.srcFlag="https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f1ea-1f1f8.png";
        break;
      case "uk-UA":
        this.srcFlag="https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f1fa-1f1e6.png";
        break;
      default: console.error("Something went wrong");
    }
  }
}
