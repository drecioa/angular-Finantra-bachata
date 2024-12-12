import { provideRouter, Routes } from '@angular/router';
import { RegisterComponent } from 'src/app/pages/auth/register/register.component';
import { SessionComponent } from 'src/app/pages/auth/session/session.component';
import { homeGuard, sessionGuard } from 'src/guards/session.guard';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { NewsComponent } from 'src/app/pages/add-new/news/news.component';
import { AddNewComponent } from 'src/app/pages/add-new/add-new.component';
import { CallbackComponent } from 'src/app/pages/callback/callback.component';
import { UserUpdateComponent } from 'src/app/pages/add-new/user-update/user-update.component';
import { CryptoFormComponent } from 'src/app/pages/add-new/crypto/crypto-form/crypto-form.component';
import { BankAccountComponent } from 'src/app/pages/bank-account/bank-account.component';
import { CryptoWalletComponent } from 'src/app/pages/crypto-wallet/crypto-wallet.component';
import { LoginComponent } from './pages/login/login.component';
import { EstadisticaComponent } from '@components/estadistica/estadistica.component';

const routes: Routes = [
    {
        path: "",
        canActivate: [homeGuard],
        children: [
            { path: "home", component: HomeComponent },
            { path: "bankAccount", component: BankAccountComponent, title: "Cuentas Bancarias" },
            { path: "cryptoWallet", component: CryptoWalletComponent, title: "Cryptomonedas" },
            { path: "stats", component: EstadisticaComponent, title: "Estadistica" },
            {
                path: "create", component: AddNewComponent,
                children: [
                    { path: "crypto", component: CryptoFormComponent, title: "Crypto Search" }
                ],
                title: "Añadir"
            },
            { path: "news", component: NewsComponent, title: "Noticias" },
            { path: "account", component: UserUpdateComponent, title: "Configuracion" },
            { path: "callback", component: CallbackComponent },
        ]
    },
    {
        path: "auth", component: SessionComponent,
        children: [
            { path: 'login', component: LoginComponent, title: "Login" },
            { path: 'register', component: RegisterComponent, title: "Registro" }
        ],
        canActivate: [sessionGuard]
    },

    { path: "", redirectTo: '/auth', pathMatch: "full" },
    { path: "**", redirectTo: '/home' }

];

export const rutas = provideRouter(routes);
