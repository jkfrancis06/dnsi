import { Component, OnInit } from '@angular/core';
import {EnvenementService} from "../../../../services/envenement/envenement.service";
import {RestService} from "../../../../services/api/rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-utilisateur-impliques',
  templateUrl: './utilisateur-impliques.component.html',
  styleUrls: ['./utilisateur-impliques.component.css']
})
export class UtilisateurImpliquesComponent implements OnInit {

  id: any;
  affaireUtilisateurs: any[] = []
  utilisateurInvalid: boolean = false;

  constructor(public envenementService: EnvenementService,
              private apiService: RestService,
              private router: Router,
              private activatedroute: ActivatedRoute,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.activatedroute?.parent?.params.subscribe((params) => {
      console.log('params', params);
      this.id = params.id
    })

    this.apiService.getAffaireUtilisateurByAffaireID(this.id).subscribe(
      response => {
        for(let i = 0; i< response.length; i++){
          this.affaireUtilisateurs = [...this.affaireUtilisateurs,response[i].utilisateur]
        }
        console.log(this.affaireUtilisateurs)
      },
      error => {
        console.log(error)
      }
    )

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

  previousPage() {
    this.router.navigate( ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'entitesImpliques'}}]);
  }

  nextPage() {
    this.router.navigate( ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'recapEnvenement'}}]);
  }
}
