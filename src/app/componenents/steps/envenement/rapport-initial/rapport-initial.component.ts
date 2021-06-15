import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EnvenementService} from "../../../../services/envenement/envenement.service";

@Component({
  selector: 'app-rapport-initial',
  templateUrl: './rapport-initial.component.html',
  styleUrls: ['./rapport-initial.component.css']
})
export class RapportInitialComponent implements OnInit {

  id: any
  resumeInvalid: boolean= false;
   submitted: boolean = false;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    public envenementService: EnvenementService
  ) { }

  ngOnInit(): void {
    this.activatedroute?.parent?.params.subscribe((params) => {
      console.log('params', params);
      this.id = params.id
    })
  }

  previousPage() {
    this.router.navigate( ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'utilisateurImpliques'}}]);
  }

  nextPage() {
    if (this.envenementService.envenementInformation.resume !== ""){
      this.resumeInvalid = false;
      this.router.navigate( ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'fichiersEnvenement'}}]);
    }
    this.resumeInvalid = true;
    this.submitted = true
  }
}
