import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items!: MenuItem[];

  constructor(private router: Router,
  ) { }

  ngOnInit(): void {

    this.items = [
      {
        label:'Tableau de bord',
        icon:'pi pi-home',
        routerLink: ['/']
      },
      {
        label:'Dossiers',
        icon:'pi  pi-folder-open',
        routerLink: ['/affaires']
      },
      {
        label:'Recherche',
        icon:'pi pi-search',
        routerLink: ['/recherche']
      },
      {
        label:'Espace Administration',
        icon:'pi  pi-id-card',
      },
      {
        label:'Parametres',
        icon:'pi pi-fw pi-cog'
      }
    ];
  }

  btnClick () {
    this.router.navigateByUrl('/logout');
  };
}
