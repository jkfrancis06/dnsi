import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EnvenementService {

  envenementInformation = {
    generalInfo: {
      typeEvenementObject: {
        designation: "",
        value: ""
      },
      typeEvenement: "",
      localisation: "",
      startAt: "" as any,
      duration: "",
      endAt: "" as any,
      geoLocalisation: "",
    },
    resume: "",
    entitesInfo: [] as any,
    utilisateursInfo: [] as any,
    preuvesInfo: [] as any
  }

  envenementCreated: any


  private envenementInputComplete = new Subject<any>();

  envenementInputComplete$ = this.envenementInputComplete.asObservable();

  constructor() { }

  resetData() {
    this.envenementInformation = {
      generalInfo: {
        typeEvenementObject: {
          designation: "",
          value: ""
        },
        typeEvenement: "",
        localisation: "",
        startAt: "",
        duration: "",
        endAt: "",
        geoLocalisation: ""
      },
      resume: "",
      entitesInfo: [] as any,
      utilisateursInfo: [] as any,
      preuvesInfo: [] as any
    }
  }

  getEnvenementInformation() {
    return this.envenementInformation;
  }

  setEnvenementInformation(envenementInformation:any) {
    this.envenementInformation = envenementInformation;
  }

  setEnvenementCreated(envenement: any){
    this.envenementCreated = envenement
  }

  complete() {
    this.envenementInputComplete.next(this.envenementCreated);
  }



}
