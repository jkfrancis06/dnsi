import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, MessageService} from "primeng/api";
import {RestService} from "../../services/api/rest.service";

@Component({
  selector: 'app-affaire-details',
  templateUrl: './affaire-details.component.html',
  styleUrls: ['./affaire-details.component.css'],
  providers: [MessageService]
})
export class AffaireDetailsComponent implements OnInit {

  index: number = 0;
  id?: string | null = '0';
  affaire: any;
  affaireLoading = true;
  displayMaximizable: any;
  addAffaireUtilisateurDisplay: any;

  constructor(
    private activatedroute:ActivatedRoute,
    private router: Router,
    private restApi: RestService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.activatedroute.paramMap.subscribe(params => {
      if (params.get('id') != null){
        this.id = params.get('id');
      }
      console.log(this.id)
      this.restApi.getAffaire(this.id).subscribe(
        response => {
          console.log(response)
          this.affaire = response
          this.affaireLoading = false
        },
        error => {
          console.log(error)
          this.handleError(error)
        }
      )
    });

  }


  handleChange($event: any) {
    console.log(this.index)
    if (this.index === 0){ // tab affaire
      this.restApi.getAffaire(this.id).subscribe(
        response => {
           console.log(response)
        },
        error => {
          console.log(error)
          this.handleError(error)
        }
      )
    }
  }

  handleError(error: any){
    if (typeof (error.error.message) === 'undefined'){
      this.showViaService(1)  // if server error
    }else {
      if (error.error.message.type === 1){
        this.showViaService(1,error.error.message.message)
        this.router.navigate(['/login'])
      }
    }
  }

  showViaService(error:number, message:any = null) {
    if (error === 1){
      this.messageService.add({severity:'error', summary:'Error', detail:'Something bad happened; please try again later'});
    }else {
      this.messageService.add({severity:'success', summary:'Succes'});
    }
  }


  showMaxAffaireUtilisateurDialog() {
    this.addAffaireUtilisateurDisplay = true;
  }

  createAffaireUtilisateur() {
    this.showMaxAffaireUtilisateurDialog()
  }
}
