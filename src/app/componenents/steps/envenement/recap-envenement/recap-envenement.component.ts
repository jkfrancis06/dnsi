import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../../services/api/rest.service";
import {EnvenementService} from "../../../../services/envenement/envenement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-recap-envenement',
  templateUrl: './recap-envenement.component.html',
  styleUrls: ['./recap-envenement.component.css']
})
export class RecapEnvenementComponent implements OnInit {

  id :any

  constructor(
    private apiService: RestService,
    public envenementService: EnvenementService,
    private router: Router,
    private activatedroute:ActivatedRoute,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    console.log(this.envenementService)
    this.activatedroute?.parent?.params.subscribe((params) => {
      console.log('params', params);
      this.id = params.id
    })
  }

  previousPage() {

  }

  nextPage() {
      let data = {
        typeEvenement: this.envenementService.envenementInformation.generalInfo.typeEvenementObject.designation,
        localisation: this.envenementService.envenementInformation.generalInfo.localisation,
        geoLocalisation: this.envenementService.envenementInformation.generalInfo.geoLocalisation,
        startAt: this.envenementService.envenementInformation.generalInfo.startAt,
        endAt: this.envenementService.envenementInformation.generalInfo.endAt,
        resume: this.envenementService.envenementInformation.resume,
        entite: [] as any,
        utilisateur: [] as any,
        preuves: this.envenementService.envenementInformation.preuvesInfo,
        affaire: "/api/affaires/"+ this.id
      }
      for (let i=0; i<this.envenementService.envenementInformation.entitesInfo.length; i++){
        data.entite.push("/api/entites/"+ this.envenementService.envenementInformation.entitesInfo[i].id)
      }
      for (let i=0; i<this.envenementService.envenementInformation.utilisateursInfo.length; i++){
        data.utilisateur.push("/api/utilisateurs/"+ this.envenementService.envenementInformation.utilisateursInfo[i].id)
      }
      console.log(data)
      this.envenementService.envenementInformation.generalInfo.typeEvenement = this.envenementService.envenementInformation.generalInfo.typeEvenementObject.designation
      this.apiService.createEvenement(data).subscribe(
        response => {
          console.log(response)
          this.envenementService.setEnvenementCreated(response)
          this.envenementService.complete();
        },
        error => {
          this.handleError(error)
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

}
