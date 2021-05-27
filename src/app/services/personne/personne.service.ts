import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonneService {


  personneInformation = {
    personneInformation: {
      nom: "",
      prenom: "",
      dateNaissance: "",
      lieuNaissance: "",
      numPassport: "",
      numCarte: "",
      nationalite: "",
    },
    roleInformation: {
      role: "",
      remarque: ""
    },
    attachementInformation: {

    }
  }

  private inputComplete = new Subject<any>();

  inputComplete$ = this.inputComplete.asObservable();


  getPersonneInformation() {
    return this.personneInformation;
  }

  setPersonneInformation(personneInformation:any) {
    this.personneInformation = personneInformation;
  }

  complete() {
    this.inputComplete.next(this.personneInformation.personneInformation);
  }

}
