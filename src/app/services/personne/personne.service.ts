import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonneService {


  personneInformation = {
    type: 1,
    informationsGenerales: {
      nom: "",
      prenom: "",
      dateNaissance: "",
      lieuNaissance: "",
      numPassport: "",
      numCarte: "",
      nationalite: "",
      alias: [],
      categorie: "",
      immatriculation: "",
      description: "",
      description2: "",
    },
    roleInformation: {
      role: "" as any,
      remarque: ""
    },
    attachementInformation: {
      images: [] as any[],
      videos: [] as any[],
      autres: [] as any[],
    }
  }

  personneCreated: any


  private inputComplete = new Subject<any>();

  inputComplete$ = this.inputComplete.asObservable();


  resetData(){
    this.personneInformation = {
      type: 1,
      informationsGenerales: {
        nom: "",
        prenom: "",
        dateNaissance: "",
        lieuNaissance: "",
        numPassport: "",
        numCarte: "",
        nationalite: "",
        alias: [],
        categorie: "",
        immatriculation: "",
        description: "",
        description2: "",
      },
      roleInformation: {
        role: "" as any,
        remarque: ""
      },
      attachementInformation: {
        images: [] as any[],
        videos: [] as any[],
        autres: [] as any[],
      }
    }
  }

  getPersonneInformation() {
    return this.personneInformation;
  }

  setPersonneInformation(personneInformation:any) {
    this.personneInformation = personneInformation;
  }

  setPersonneCreated(personne: any){
    this.personneCreated = personne
  }

  complete() {
    this.inputComplete.next(this.personneCreated);
  }

}
