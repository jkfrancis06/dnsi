import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ConstantsService} from "../general/constants.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private constProvider: ConstantsService) { }

  login(username: string, password: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      })
    };

    // const input = new FormData();
    // input.append('login', username );
    // input.append('password', password);

    return this.http.post(this.constProvider.SERVER_ADDRESS + this.constProvider.LOGIN_URL, {
      username: username,
      password: password
    }, httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }


  private handleError (error: HttpErrorResponse) {
    // TODO: seems we cannot use messageService from here...
    const errMsg = (error.message) ? error.message : 'Server error';
    console.error(errMsg);
    console.error(error.status);

    return throwError(
      error);
  }
}
