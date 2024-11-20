import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { SessionComponent } from '@components/session/session.component';
import { homeGuard, sessionGuard } from 'src/guards/session.guard';
import { HeaderComponent } from '@components/header/header.component';
import { SessionMainPageComponent } from '@components/session/session-main-page/session-main-page.component';
import { HomeComponent } from '@components/home/home.component';
import { EstadisticaComponent } from '@components/estadistica/estadistica.component';
import { NewsComponent } from '@components/news/news.component';
import { AddNewComponent } from '@components/add-new/add-new.component';
import { FormBancoComponent } from '@components/form-banco/form-banco.component';

const routes: Routes = [
    {path:"auth", component:SessionComponent,
        children: [
            {path: "", component: SessionMainPageComponent, title:"Inicia sesión"},
            {path: 'login', component:LoginComponent, title:"Login"},
            {path: 'register', component:RegisterComponent, title: "Registro"}
        ],
        canActivate:[sessionGuard]
    },
    {path:"home", component:HeaderComponent,
        children:[
            {path: "", component:HomeComponent, title:"Cuentas"},
            {path: "stats", component:EstadisticaComponent, title:"Estadistica"},
            {path: "create", component: AddNewComponent, title:"Añadir",
                children:[
                    {path: "connect-to-bank", component:FormBancoComponent, title:"Añadir Banco"}
                ]
            },
            {path: "news", component: NewsComponent, title: "Noticias"},
        ],
        canActivate:[homeGuard], 
        title:'Finantra'},
    {path:"", redirectTo:'/auth', pathMatch:"full"},
    {path: "**", redirectTo:'/home'}

];

export const rutas= provideRouter(routes);
