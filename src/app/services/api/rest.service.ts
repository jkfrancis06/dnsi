import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ConstantsService} from "../general/constants.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class RestService {

  token_data? : any;


  constructor(
    private router: Router,private http: HttpClient,private constProvider: ConstantsService
  ) { }


  checkToken(token:any){
    if (token === null){
      this.router.navigate(['/login'])
    }
  }

  getUserTasks(): Observable<any> {

    this.token_data = localStorage.getItem('token-data')
    let token_data = JSON.parse(this.token_data)

    this.checkToken(token_data);

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ token_data.token
      })
    };

    return this.http.get(this.constProvider.SERVER_ADDRESS + this.constProvider.USER_TASKS
      , httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  getUserTaskCreated(): Observable<any> {

    this.token_data = localStorage.getItem('token-data')
    let token_data = JSON.parse(this.token_data)

    this.checkToken(token_data);

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ token_data.token
      })
    };

    return this.http.get(this.constProvider.SERVER_ADDRESS + this.constProvider.GET_TACHE_UTILISATEUR_CREATED
      , httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  getTask(id:number): Observable<any> {

    this.token_data = localStorage.getItem('token-data')
    let token_data = JSON.parse(this.token_data)
    this.checkToken(token_data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ token_data.token
      })
    };

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_TASK  +'/'+ id
      , httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  getUtilisateurAffaires(): Observable<any> {

    this.token_data = localStorage.getItem('token-data')
    let token_data = JSON.parse(this.token_data)
    this.checkToken(token_data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ token_data.token
      })
    };

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_UTILISATEUR_AFFAIRES
      , httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }


  getDepartementAffaires(): Observable<any> {

    this.token_data = localStorage.getItem('token-data')
    let token_data = JSON.parse(this.token_data)
    this.checkToken(token_data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ token_data.token
      })
    };

    let token_user = localStorage.getItem('user');
    let user:any;
    if (token_user != null) {
       user = JSON.parse(token_user)
    }

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_DEPARTEMENT_AFFAIRES+user.id
      , httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  updateTacheUtilisateur(id:number, data:any): Observable<any> {

    this.token_data = localStorage.getItem('token-data')
    let token_data = JSON.parse(this.token_data)
    this.checkToken(token_data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ token_data.token
      })
    };

    return this.http.put(this.constProvider.SERVER_ADDRESS +this.constProvider.UPDATE_TACHE_UTILISATEUR  +'/'+ id
      ,data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  getAffaire(id:any): Observable<any> {

    this.token_data = localStorage.getItem('token-data')
    let token_data = JSON.parse(this.token_data)
    this.checkToken(token_data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ token_data.token
      })
    };

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_AFFAIRE  + id
      , httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }



  private handleError (error: HttpErrorResponse) {
    // TODO: seems we cannot use messageService from here...
    const errMsg = (error.message) ? error.message : 'Server error';
    console.error(errMsg);
    console.error(error.status);

    if (error.status === 401) {
      console.log(error.error.message.type)
    }

    return throwError(
      error);
  }


}
