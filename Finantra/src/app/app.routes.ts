import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { SessionComponent } from '@components/session/session.component';

const routes: Routes = [
    {path:"session", component:SessionComponent,
        children: [
            {path: 'login', component:LoginComponent},
            {path: 'register', component:RegisterComponent}
        ]
    },
    {path:"home", component:AppComponent},
    {path:"", redirectTo:'/session', pathMatch:"full"}

];

export const rutas= provideRouter(routes);
