// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class USERAuthGuard implements CanActivate {
  constructor(private router: Router,private apiservice:ApiService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Perform your validation logic here
    const isLoggedIn = this.apiservice.isUserLogin();

    if (isLoggedIn) {
      return true;
    } else {
      // Redirect to login page if validation fails
      //return this.router.createUrlTree(['/login']);
      return this.router.createUrlTree(['/']);
    }
  }
}
