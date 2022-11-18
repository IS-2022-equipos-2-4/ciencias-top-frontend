import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(routeSnapshot: ActivatedRouteSnapshot): boolean {
    const allowedRoles = routeSnapshot.data['allowedRoles'];
    const redirectionRoute = routeSnapshot.data['redirectionRoute'];

    const isAllowed =
      (allowedRoles.includes('admin') !== undefined && this.authService.esAdmin()) ||
      (allowedRoles.includes('provider') !== undefined &&
        this.authService.esProveedor()) ||
      (allowedRoles.includes('user') !== undefined &&
        this.authService.isAuthenticated());

    if (!isAllowed) {
      this.router.navigate([redirectionRoute]);
    }

    return isAllowed;
  }
}
