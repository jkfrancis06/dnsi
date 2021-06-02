import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../../services/api/rest.service";
import {EnvenementService} from "../../../../services/envenement/envenement.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recap-envenement',
  templateUrl: './recap-envenement.component.html',
  styleUrls: ['./recap-envenement.component.css']
})
export class RecapEnvenementComponent implements OnInit {

  constructor(
    private apiService: RestService,
    public envenementService: EnvenementService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  previousPage() {

  }

  nextPage() {

  }
}
