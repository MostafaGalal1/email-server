import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(route.routeConfig?.path);
      console.log("adasdasdasd")
      if (localStorage.getItem('currentUser') !== null) {
        return true;
    }
    
    if(route.routeConfig?.path === "signup"){
      this.router.navigate(['/signup'], { queryParams: { signed: 'fail' }});
    }else{
      this.router.navigate(['/login'], { queryParams: { logged: 'fail' }});
    }
    return false;
  }
}
