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
    console.log(id)

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_TASK  +'/'+id
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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_AFFAIRE+'?departement.id='+user.departement
      , httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  getAffaireEnvenements(affaireId:any): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.ENVENEMENTS+'?affaire.id='+ affaireId+"&order[startAt]=asc"
      , httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }


  getConsultations(): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.CAN_CONSULT+'?utilisateur.id='+user.id
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


  revoquerConsult(id:number): Observable<any> {

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

    let data = {
      isRevoked: true,
    }

    return this.http.put(this.constProvider.SERVER_ADDRESS +this.constProvider.CAN_CONSULT  +'/'+ id
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


  createConsult(consult:any): Observable<any> {

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

    return this.http.post(this.constProvider.SERVER_ADDRESS +this.constProvider.CREATE_CONSULTATION,
      consult
      , httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  getUserDepartementUSers(): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_DEPARTMENT_USERS
      , httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }



  createAffaireUtilisateurs(data: any): Observable<any> {

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

    return this.http.post(this.constProvider.SERVER_ADDRESS +this.constProvider.CREATE_AFFAIRE_UTILISATEUR
      ,data,
      httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }


  removeAffaireUtilisateur(id: number): Observable<any> {

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

    return this.http.delete(this.constProvider.SERVER_ADDRESS +this.constProvider.REMOVE_AFFAIRE_UTILISATEUR + id
    ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }



  getAffaireEntites(id: number): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_ENTITES + "affaire.id="+id
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }



  createEvenement(data: any): Observable<any> {

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

    return this.http.post(this.constProvider.SERVER_ADDRESS +this.constProvider.ENVENEMENTS,
      data
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }






  uploadFiles(formData: FormData): Observable<any> {

    this.token_data = localStorage.getItem('token-data')
    let token_data = JSON.parse(this.token_data)
    this.checkToken(token_data);

    console.log(formData.get('file[]'))

    return this.http.post(this.constProvider.SERVER_ADDRESS +this.constProvider.UPLOAD_FILES_URL,
      formData
      ,{
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ token_data.token
        })
      })
      .pipe(
        catchError(this.handleError)
      );

  }





  getMatchingNomPrenom(nom: string, prenom: string): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_ENTITES+"description="+nom+"&description2="+prenom
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  getMatchingNumPassport(numPassport: string): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_PERSONNES+"numPassport="+numPassport
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  getMatchingNumCarte(numCarte: string): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_PERSONNES+"numCarte="+numCarte
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  getMatchingImmatriculation(immatriculation: string): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_VEHICULES+"immatriculation="+immatriculation
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  getMatchingDescription(description: string): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_ENTITES+"description="+description
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  getMatchingAliases(alias: string): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_PERSONNES+"aliases.alias="+alias
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }


  getMatchingDescription2(description2: string): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_ENTITES+"description2="+description2
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }


  createAffaire(affaire: any): Observable<any> {

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

    return this.http.post(this.constProvider.SERVER_ADDRESS +this.constProvider.POST_AFFAIRE,
      affaire
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  getAffaireUtilisateurByAffaireID(affaireID: any): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.CREATE_AFFAIRE_UTILISATEUR+"?affaire.id="+affaireID
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }


  createTache(tache: any): Observable<any> {

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

    return this.http.post(this.constProvider.SERVER_ADDRESS +this.constProvider.GET_TASK,
      tache
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }


  getImage(url: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
        'Accept': 'text/plain',
      })
    };
    let typeUrl = "/file/get/"

    return this.http.get(
      this.constProvider.SERVER_ADDRESS + typeUrl+url,
      {responseType: 'text'})
  }



  createPersonne(personne: any): Observable<any> {

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

    let typeUrl= ""

    if (personne.type === 1){
      typeUrl = this.constProvider.CREATE_PERSONNE
      personne.description = personne.nom
      personne.description2 = personne.prenom
    }
    if (personne.type === 2){
      typeUrl = this.constProvider.CREATE_VEHICULE
    }
    if (personne.type === 3){
      typeUrl = this.constProvider.CREATE_ORGANISATION
    }

    return this.http.post(this.constProvider.SERVER_ADDRESS +typeUrl,
      personne
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }


  getAffaireDirectedBy(affaireID: any): Observable<any> {

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

    return this.http.get(this.constProvider.SERVER_ADDRESS +this.constProvider.AFFAIRE_DIRECTED+"?affaire.id="+affaireID
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }


  putAffaireDirectedBy(id: any): Observable<any> {

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

    let data = {
      isRevoked : true
    }

    return this.http.put(this.constProvider.SERVER_ADDRESS +this.constProvider.AFFAIRE_DIRECTED+"/"+id,
      data
      ,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }


  postAffaireDirectedBy(data: any): Observable<any> {

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


    return this.http.post(this.constProvider.SERVER_ADDRESS +this.constProvider.AFFAIRE_DIRECTED,
      data
      ,httpOptions)
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
