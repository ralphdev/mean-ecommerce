import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AdminService);
  const _router = inject(Router);

  if(!authService.isAuthenticated(['admin'])){
    _router.navigate(['/login']);
    return false;
  }

  return true;
};
