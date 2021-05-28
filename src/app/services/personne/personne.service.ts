import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonneService {


  personneInformation = {
    informationsGenerales: {
      nom: "",
      prenom: "",
      dateNaissance: new Date(),
      lieuNaissance: "",
      numPassport: "",
      numCarte: "",
      nationalite: "",
      alias: []
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
    this.inputComplete.next(this.personneInformation.informationsGenerales);
  }

}
