import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = sessionStorage.getItem('@pin_token')

    if (token) this.router.navigate(['dashboard'])

    return true
  }

}
