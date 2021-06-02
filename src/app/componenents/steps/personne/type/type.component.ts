import { Component, OnInit } from '@angular/core';
import {PersonneService} from "../../../../services/personne/personne.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {


  types!: any[];
  id: any;

  typeInformation: any;
  typeInvalid: boolean = false;



  constructor(
    public personneService: PersonneService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {


    this.activatedroute?.parent?.params.subscribe((params) => {
      console.log('params', params);
      this.id = params.id
    })


    this.typeInformation = this.personneService.personneInformation.type


    this.types = [
      {designation: "Personne", value: 1},
      {designation: "Vehicule", value: 2},
      {designation: "Organisation", value: 3},
    ]

  }

  nextPage() {
    console.log(this.typeInformation)
    this.typeInvalid = false
    this.router.navigate( ['/affaire-details/'+ this.id ,{outlets:{entiteRoute:'general-info'}}]);

  }
}
