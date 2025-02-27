import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/authService/auth.service';

export const homeGuard: CanActivateFn = (route, state) => {
  const auth= inject(AuthService);
  const ruta=inject(Router);

  if(!auth.isLogged()){
    ruta.navigate(["/auth/login"]);
    return false;
  }

  return true;
};

export const sessionGuard: CanActivateFn=(route, state)=>{
  const auth= inject(AuthService);
  const ruta=inject(Router);

  if(auth.isLogged()){
    ruta.navigate(["/home"]);
    return false;
  }
  return true;
}
