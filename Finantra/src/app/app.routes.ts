import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { SessionComponent } from '@components/session/session.component';
import { homeGuard, sessionGuard } from 'src/guards/session.guard';
import { HeaderComponent } from '@components/header/header.component';

const routes: Routes = [
    {path:"auth", component:SessionComponent,
        children: [
            {path: 'login', component:LoginComponent},
            {path: 'register', component:RegisterComponent}
        ],
        canActivate:[sessionGuard]
    },
    {path:"home", component:HeaderComponent, canActivate:[homeGuard]},
    {path:"", redirectTo:'/auth', pathMatch:"full"},
    {path: "**", redirectTo:'/home'}

];

export const rutas= provideRouter(routes);
