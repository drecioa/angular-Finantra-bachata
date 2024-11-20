import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  auth=inject(AuthService);
  redirect=inject(Router);
  constructor() { }
}
