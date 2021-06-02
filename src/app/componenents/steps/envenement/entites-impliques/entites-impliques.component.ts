import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../../services/api/rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EnvenementService} from "../../../../services/envenement/envenement.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-entites-impliques',
  templateUrl: './entites-impliques.component.html',
  styleUrls: ['./entites-impliques.component.css']
})
export class EntitesImpliquesComponent implements OnInit {

  id: any
  entites: any[] = []
  entiteInvalid: boolean = false;

  constructor(private restApi: RestService,
              public envenementService: EnvenementService,
              private activatedroute: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {

    this.activatedroute?.parent?.params.subscribe((params) => {
      console.log('params', params);
      this.id = params.id
    })

    this.restApi.getAffaireEntites(this.id).subscribe(
      response => {
        console.log(response)
        this.entites = response
      },
      error => {
        this.handleError(error)
      }
    )
  }


  nextPage(){
    if (this.envenementService.envenementInformation.entitesInfo.length <=0 ){
      this.entiteInvalid = true
    }else {
      this.router.navigate( ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'utilisateurImpliques'}}]);
    }
  }


  previousPage() {
    this.router.navigate( ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'envenement'}}]);
  }




  handleError(error: any){
    if (error.status === 403){
      console.log('ok')
      this.messageService.add({severity:'error', summary:'Error', detail:"Vous n'avez pas les autorisations neccessaires pour effectuer cette action." +
          " Veuillez demander l'acces au proprietaire de la ressource"});
    }
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
}
