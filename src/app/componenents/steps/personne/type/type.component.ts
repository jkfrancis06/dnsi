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

    // @ts-ignore
    this.activatedroute.parent.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
      console.log(url)
      this.id = parseInt(url)
    })

    this.typeInformation = this.personneService.personneInformation.type


    this.types = [
      {designation: "Personne", value: 1},
      {designation: "Vehicule", value: 2},
      {designation: "Organisation", value: 3},
    ]

  }

  nextPage() {
    if (this.typeInformation != ""){
      this.typeInvalid = false
      this.personneService.personneInformation.type = this.typeInformation.value
      this.router.navigate(["/affaire-details/"+this.id+"/general-info"]);
    }else {
      this.typeInvalid = true
    }

  }
}
