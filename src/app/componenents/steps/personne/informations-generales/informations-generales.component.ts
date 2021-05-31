import { Component, OnInit } from '@angular/core';
import {PersonneService} from "../../../../services/personne/personne.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-informations-generales',
  templateUrl: './informations-generales.component.html',
  styleUrls: ['./informations-generales.component.css']
})

export class InformationsGeneralesComponent implements OnInit {

  informationsGenerales: any;

  submitted: boolean = false;

  nbAlias: any = 1;

  items: any[] = [];

  textBoxFormGroup!: FormArray;

  id: any;

  maxDate = new Date();
  yearRange = "1900:"+ new Date().getFullYear();

  constructor(public personneService: PersonneService,
              private router: Router,
              public formBuilder:FormBuilder,
              private activatedroute:ActivatedRoute,
  ) {

    this.textBoxFormGroup = this.formBuilder.array([]);
    // create a least one alias input
    this.items.pop();
    this.textBoxFormGroup.removeAt(0);
    this.addControl(this.nbAlias);
    this.nbAlias--;

  }

  ngOnInit() {
    this.informationsGenerales = this.personneService.getPersonneInformation().informationsGenerales;

    console.log(this.personneService.personneInformation.type)
    // @ts-ignore
    this.activatedroute.parent.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
      console.log(url)
      this.id = parseInt(url)
    })
  }

  nextPage() {
    if (this.informationsGenerales.nom || this.informationsGenerales.prenom || this.informationsGenerales.alias[0] ||
      this.informationsGenerales.description) {

      this.personneService.personneInformation.informationsGenerales = this.informationsGenerales;
      console.log(this.informationsGenerales)
      if (this.informationsGenerales.type === 1){
        this.personneService.personneInformation.informationsGenerales.description = this.informationsGenerales.nom
        this.personneService.personneInformation.informationsGenerales.description2 = this.informationsGenerales.prenom
      }
      this.router.navigate(["/affaire-details/"+this.id+"/role"]);
      return;
    }


    this.submitted = true;
  }

  onAliasNbChange(event: any) {
    console.log(event)
    if (event.target.value != null) {
      this.nbAlias = parseInt(event.target.value)
      while(this.textBoxFormGroup.length > 0) {
        this.items.pop();
        this.textBoxFormGroup.removeAt(0);
      }
      while(this.nbAlias > 0) {
        this.addControl(this.nbAlias);
        this.nbAlias--;
      }
    }
  }

  addControl(i: any) {
    this.items.push({id: i.toString()})
    this.textBoxFormGroup.push(this.formBuilder.control(''));
  }

  previousPage() {
    this.router.navigate(["/affaire-details/"+this.id+"/type"]);
  }
}
