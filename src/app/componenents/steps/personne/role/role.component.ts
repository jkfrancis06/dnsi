import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PersonneService} from "../../../../services/personne/personne.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(
    public personneService: PersonneService,
    private router: Router,
    private activatedroute:ActivatedRoute,

  ) { }

  roles!: any[];

  roleInformation: any;

  submitted: boolean = false;

  id: any;

  @ViewChild("remarque") input: any;
  roleInvalid: boolean = false;
  remarqueInvalid: boolean = false;

  ngOnInit(): void {

    // @ts-ignore
    this.activatedroute.parent.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
      console.log(url)
      this.id = parseInt(url)
    })

    this.roleInformation = this.personneService.personneInformation.roleInformation
    this.roles = [
      {designation: "Suspect", value: "Suspect"},
      {designation: "Personne d'intérêt", value: "Personne d'intérêt"},
      {designation: "Victime", value: "Victime"},
      {designation: "Témoin", value: "Témoin"},
    ]
  }

  nextPage() {
    this.roleInvalid = this.personneService.personneInformation.roleInformation.role === "";

    this.remarqueInvalid = this.personneService.personneInformation.roleInformation.remarque === "";

    if (!this.remarqueInvalid && !this.roleInvalid){
      this.router.navigate(["/affaire-details/"+this.id+"/fichiers"]);
    }

  }
}
