import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { ClienteService } from '../services/cliente.service';

export const authGuard: CanActivateFn = (route, state) => {

  const _clienteService = inject(ClienteService);
  const _router = inject(Router);

  if(!_clienteService.IsAuthenticated([])){
    _router.navigate(['/login']);
    return false;
  }

  return true;
};