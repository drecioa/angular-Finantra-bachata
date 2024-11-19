import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/authService/auth.service';

export const sessionGuard: CanActivateFn = (route, state) => {
  const auth= inject(AuthService);
  const ruta=inject(Router);

  if(!auth.isLogged()){
    ruta.navigate(["/session"]);
    return false;
  }

  return true;
};
