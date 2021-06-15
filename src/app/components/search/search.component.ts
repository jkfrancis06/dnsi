import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  entityTypes: any[] = [];
  searchTypes: any[] = [];
  selectedEntityType: any = 1 ;
  searchType: any = 1 ;

  constructor() {
    this.entityTypes = [
      {name: 'Personne', value: 1 },
      {name: 'Vehicule', value: 2 },
      {name: 'Organisation', value: 3 },
    ]

    this.searchTypes = [
      {name: 'Stricte', value: 1 },
      {name: 'Large', value: 2 }
    ]
  }

  ngOnInit(): void {
  }

}
