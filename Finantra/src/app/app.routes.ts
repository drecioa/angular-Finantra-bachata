import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { SessionComponent } from '@components/session/session.component';
import { homeGuard, sessionGuard } from 'src/guards/session.guard';
import { HeaderComponent } from '@components/header/header.component';
import { SessionMainPageComponent } from '@components/session/session-main-page/session-main-page.component';

const routes: Routes = [
    {path:"auth", component:SessionComponent,
        children: [
            {path: "", component: SessionMainPageComponent, title:"Inicia sesión"},
            {path: 'login', component:LoginComponent, title:"Login"},
            {path: 'register', component:RegisterComponent, title: "Registro"}
        ],
        canActivate:[sessionGuard]
    },
    {path:"home", component:HeaderComponent, canActivate:[homeGuard], title:'Finantra'},
    {path:"", redirectTo:'/auth', pathMatch:"full"},
    {path: "**", redirectTo:'/home'}

];

export const rutas= provideRouter(routes);
