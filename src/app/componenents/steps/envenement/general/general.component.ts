import { Component, OnInit } from '@angular/core';
import {EnvenementService} from "../../../../services/envenement/envenement.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  eventType = [
    {designation: "Perquisition", value: "Perquisition"},
    {designation: "Interrogatoire", value: "Interrogatoire"},
    {designation: "Autres", value: "Autres"}
  ]

  envenementInformation: any
  submitted: boolean = false;
  typeInvalid: boolean = false;
  maxStartAtDateValue = new Date();
  id: any

  constructor(
    public envenementService: EnvenementService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {
    envenementService.envenementInformation.generalInfo.startAt = new Date()
  }

  ngOnInit(): void {
    this.envenementInformation = this.envenementService.envenementInformation
    this.activatedroute?.parent?.params.subscribe((params) => {
      console.log('params', params);
      this.id = params.id
    })
  }

  nextPage() {

    console.log(this.envenementService.envenementInformation.generalInfo)
    if (!this.envenementService.envenementInformation.generalInfo.typeEvenementObject.value ||
      !this.envenementService.envenementInformation.generalInfo.localisation ||
      !this.envenementService.envenementInformation.generalInfo.startAt ){
      this.typeInvalid = true
      this.submitted = true
    }else {
      this.router.navigate( ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'entitesImpliques'}}]);
    }
  }
}
