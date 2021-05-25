import { Component, OnInit } from '@angular/core';
import {RestService} from "../../services/api/rest.service";
import {Affaire} from "../../models/affaire";
import {MenuItem, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-affaire',
  templateUrl: './affaire.component.html',
  styleUrls: ['./affaire.component.css'],
})
export class AffaireComponent implements OnInit {


  userAffaires!:any[];
  affaire?:any;

  affairesLoading = true;
  showAffaire = false

  items: MenuItem[] = [];


  constructor(private apiService: RestService,
              private router: Router,

  ) { }

  ngOnInit(): void {

      // context menu

      this.items = [
        {
          label: 'Actualiser',
          routerLink: ['/affaires']
        },
        {
          label: 'Nouvelle affaire',
          icon: 'pi pi-fw pi-plus'
        }
      ];

      this.apiService.getUtilisateurAffaires().subscribe(
        response => {
          this.affairesLoading = false
          this.userAffaires = response
        },
        error => {
            console.log(error)
        }
      )
  }

  onAffaireRowDblClick(affaire:any){
    console.log(affaire)
    this.affaire = affaire
    this.showAffaire = true
  }

  onRowUnselect(){
    this.showAffaire = false;
  }


  affaireDetails() {
    this.router.navigate(['/affaire-details',this.affaire.id]);
  }
}
