import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // load token data from localstorage
    let  storedToken = localStorage.getItem('token-data');
    console.log(storedToken)

    if (storedToken === null) {  // token data not found so not logged
      this.router.navigate(['/login']);
      return false;
    }else {
      let token = JSON.parse(storedToken);
      // now compares if token is expired
      let actual_timestamp = Date.now();
      console.log(token.expires*1000 <= actual_timestamp)

      if (token.expires*1000 <= actual_timestamp){
        this.router.navigate(['/login']);
        return false;
      }else {
        return true
      }
    }
    return true;
  }

}
