import { Component, OnInit } from '@angular/core';
import {PersonneService} from "../../../../services/personne/personne.service";
import {RestService} from "../../../../services/api/rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  personneInfo: any;
  matchingNomPrenom: any[] = [];
  matchingNumPassport: any[] = [];
  matchingNumCarte: any[] = [];
  matchingAlias: any[] = [];
  matchingImmatriculation: any[] = [];
  matchingDescription: any[] = [];
  matchingDescription2: any[] = [];

  id: any;

  constructor(
    public personneService: PersonneService,
    public apiService: RestService,
    private router: Router,
    private messageService: MessageService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.personneInfo = this.personneService.personneInformation

    // @ts-ignore
    this.activatedroute.parent.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
      console.log(url)
      this.id = parseInt(url)
    })

    // search matching nom prenom
    this.apiService.getMatchingNomPrenom(this.personneInfo.informationsGenerales.nom,
      this.personneInfo.informationsGenerales.prenom
    ).subscribe(
      response => {
        this.matchingNomPrenom = response
        console.log(response)
      },
      error => {
        this.handleError(error)
      }
    )


    // search matching num passport
    this.apiService.getMatchingNumPassport(this.personneInfo.informationsGenerales.numPassport
    ).subscribe(
      response => {
        this.matchingNumPassport = response
        console.log(response)
      },
      error => {
        this.handleError(error)
      }
    )

    // search matching num carte
    this.apiService.getMatchingNumCarte(this.personneInfo.informationsGenerales.numCarte
    ).subscribe(
      response => {
        this.matchingNumCarte = response
        console.log(response)
      },
      error => {
        this.handleError(error)
      }
    )


    // search matching immatriculation
    this.apiService.getMatchingImmatriculation(this.personneInfo.informationsGenerales.immatriculation
    ).subscribe(
      response => {
        this.matchingImmatriculation = response
        console.log(response)
      },
      error => {
        this.handleError(error)
      }
    )


    // search matching immatriculation
    this.apiService.getMatchingImmatriculation(this.personneInfo.informationsGenerales.immatriculation
    ).subscribe(
      response => {
        this.matchingImmatriculation = response
        console.log(response)
      },
      error => {
        this.handleError(error)
      }
    )

    // search matching description
    this.apiService.getMatchingDescription(this.personneInfo.informationsGenerales.description
    ).subscribe(
      response => {
        this.matchingDescription = response
        console.log(response)
      },
      error => {
        this.handleError(error)
      }
    )

    // search matching description 2
    this.apiService.getMatchingDescription2(this.personneInfo.informationsGenerales.description2
    ).subscribe(
      response => {
        this.matchingDescription2 = response
        console.log(response)
      },
      error => {
        this.handleError(error)
      }
    )

    let i = 0;

    for (let i = 0; i<this.personneInfo.informationsGenerales.alias.length; i++){
      this.apiService.getMatchingAliases(this.personneInfo.informationsGenerales.alias[i]
      ).subscribe(
        response => {
          if (response.length === 0){
            let item = "empty"
            this.matchingAlias.push(item)
          }else {
            this.matchingAlias.push(response)
          }
          console.log(this.matchingAlias)
        },
        error => {
          this.handleError(error)
        }
      )
    }




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
    this.router.navigate(["/affaire-details/"+this.id+"/fichiers"]);
  }

  nextPage() {

    let aliases = [];

    if (this.personneService.personneInformation.informationsGenerales.alias.length > 0){
      for (let i= 0; i<this.personneService.personneInformation.informationsGenerales.alias.length; i++){
        let aliasItem = {
          alias : this.personneService.personneInformation.informationsGenerales.alias[i]
        }
        aliases.push(aliasItem)
      }
    }


    let personne = {
      cat: this.personneService.personneInformation.type,
      nom: this.personneService.personneInformation.informationsGenerales.nom,
      prenom: this.personneService.personneInformation.informationsGenerales.prenom,
      dateNaissance: this.personneService.personneInformation.informationsGenerales.dateNaissance,
      lieuNaissance: this.personneService.personneInformation.informationsGenerales.nationalite,
      numPassport: this.personneService.personneInformation.informationsGenerales.numPassport,
      numCarte: this.personneService.personneInformation.informationsGenerales.numCarte,
      nationalite: this.personneService.personneInformation.informationsGenerales.nationalite,
      description: this.personneService.personneInformation.informationsGenerales.description,
      description2: this.personneService.personneInformation.informationsGenerales.description2,
      immatriculation: this.personneService.personneInformation.informationsGenerales.immatriculation,
      categorie: this.personneService.personneInformation.informationsGenerales.categorie,
      role: this.personneService.personneInformation.roleInformation.role.value,
      resume: this.personneService.personneInformation.roleInformation.remarque,
      affaire: "/api/affaires/"+this.id,
      aliases: aliases,
      attachements: [] as any[],
      mainPicture: "icon-default.png",
      type: this.personneService.personneInformation.type
    }

    if (this.personneService.personneInformation.attachementInformation.images.length > 0){
      personne.mainPicture = this.personneService.personneInformation.attachementInformation.images[0]
      for (let i= 0; i<this.personneService.personneInformation.attachementInformation.images.length; i++){
        let imageItem = {
          name: this.personneService.personneInformation.attachementInformation.images[i],
          type: 1,
          description: "Image"
        }
        personne.attachements.push(imageItem)
      }
    }

    if (this.personneService.personneInformation.attachementInformation.videos.length > 0){
      for (let i= 0; i<this.personneService.personneInformation.attachementInformation.videos.length; i++){
        let videosItem = {
          name: this.personneService.personneInformation.attachementInformation.videos[i],
          type: 2,
          description: "Videos"
        }
        personne.attachements.push(videosItem)
      }
    }

    if (this.personneService.personneInformation.attachementInformation.autres.length > 0){
      for (let i= 0; i<this.personneService.personneInformation.attachementInformation.autres.length; i++){
        let autresItem = {
          name: this.personneService.personneInformation.attachementInformation.autres[i],
          type: 3,
          description: "Autres"
        }
        personne.attachements.push(autresItem)
      }
    }

    console.log(personne)
    this.apiService.createPersonne(personne).subscribe(
      response => {
        this.personneService.setPersonneCreated(response)
        this.personneService.complete();
      },
      error => {
        this.handleError(error)
      }
    )
  }
}
