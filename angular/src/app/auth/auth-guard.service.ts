import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(routeSnapshot: ActivatedRouteSnapshot): boolean {
    const allowedRoles = routeSnapshot.data['allowedRoles'];
    const redirectionRoute = routeSnapshot.data['redirectionRoute'];

    const isAllowed =
      (allowedRoles.includes('admin') !== undefined && this.authService.esAdmin()) ||
      (allowedRoles.includes('provider') !== false &&
        this.authService.esProveedor()) ||
      (allowedRoles.includes('user') !== false &&
        this.authService.isAuthenticated());

    if (!isAllowed) {
      Swal.fire('Error', `Acceso denegado`, 'error');
      this.router.navigate([redirectionRoute]);
    }

    return isAllowed;
  }
}
