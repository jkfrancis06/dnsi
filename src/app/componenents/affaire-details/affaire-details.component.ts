import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, MessageService, SelectItemGroup} from "primeng/api";
import {RestService} from "../../services/api/rest.service";
import {DepUser} from "../../models/depUser";
import {ConfirmationService} from 'primeng/api';
import {Subscription} from "rxjs";
import {PersonneService} from "../../services/personne/personne.service";
import {ConstantsService} from "../../services/general/constants.service";


interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-affaire-details',
  templateUrl: './affaire-details.component.html',
  styleUrls: ['./affaire-details.component.css'],
  providers: [MessageService,ConfirmationService]
})



export class AffaireDetailsComponent implements OnInit {


  index: number = 0;  // tab nav index

  id?: string | null = '0';

  affaire: any;
  affaireLoading = true;

  displayMaximizable: any;
  addAffaireUtilisateurDisplay: any;
  depUtilisateur!: {
    id: number;
    label: string;
    inactive: boolean;
  };
  user: any;
  selectedDepUtilisateurs: number[] = [];
  depUtilisateurs: DepUser[] = [];
  test = 0;
  selectedAffaireUtilisateur: any;

  // menu api items
  items: MenuItem[] = [];
  entiteButtonItems: MenuItem[] = [];

  entites: any[] = [];

  entite: any;

  // loader
  loading: boolean = false;
  personneDialog:Boolean = false;
  personneSteps: MenuItem[] = [];

  subscription: Subscription = new Subscription;
  showEntite: boolean = false;

  displayCustom: boolean = false;

  activeIndex: number = 0;

  responsiveOptions:any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  displayPdfViewer: boolean = false;

  documentSource: string  = "";
  isPdfVisible: boolean = false;
  deniedAccess: boolean = false;

  task: any = {
    titre: "Demande d'access",
    priorite: 1 as number,
    expireAt: new Date(new Date().getTime()+(5*24*60*60*1000)),
    resume: "<b>Demande d'autorisation</b><div>Demande de consultation de ce dossier</div><div><br></div>"
  };

  submitted: boolean = false;
  minDateValue = new Date();

  affaireUtilisateurs: any[] = []


  constructor(
    private activatedroute:ActivatedRoute,
    private router: Router,
    private restApi: RestService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public personneService: PersonneService,
    public constService: ConstantsService
  ) {
    let local = localStorage.getItem('user')
    if (local != null) {
      this.user = JSON.parse(local)
    }
    console.log(this.user)



  }

  ngOnInit(): void {


    this.activatedroute.paramMap.subscribe(params => {
      if (params.get('id') != null){
        this.id = params.get('id');
      }

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


    this.personneSteps = [
      {
        label: 'Type',
        routerLink: '/affaire-details/'+this.id+'/type'
      },
      {
      label: 'Informations Generales',
      routerLink: '/affaire-details/'+this.id+'/general-info'
      },
      {
        label: 'Role',
        routerLink: '/affaire-details/'+this.id+'/role'
      },
      {
        label: 'Fichiers joints',
        routerLink:  '/affaire-details/'+this.id+'/fichiers'
      },
      {
        label: 'Recaptitulatif',
        routerLink:  '/affaire-details/'+this.id+'/recap'
      }
    ];

    this.subscription = this.personneService.inputComplete$.subscribe((personalInformation) =>{
      console.log(personalInformation)
      this.personneDialog = false
      this.entites.push(personalInformation)
      this.messageService.add({severity:'success', summary:'Entité crée avec succès'});
      this.personneService.resetData()
      this.router.navigate(['/affaire-details/'+this.id])
      console.log(this.entites)
    });


  }


  handleChange($event: any) {
    console.log(this.index)
    if (this.index === 0){ // tab affaire
      this.restApi.getAffaire(this.id).subscribe(
        response => {
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
        },
        error => {
          console.log(error)
          this.handleError(error)
        }
      )
    }

    if (this.index === 1) {  // tab entités
      this.restApi.getAffaireEntites(this.affaire.id).subscribe(
        response => {
          console.log(response)
          this.entites = response
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  handleError(error: any){
    if (error.status === 403){
      this.deniedAccess = true
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


  showMaxAffaireUtilisateurDialog() {  // show dialog to assign user to affaire

    this.depUtilisateurs = [];
    this.selectedDepUtilisateurs = []

    this.restApi.getUserDepartementUSers().subscribe(
      response => {
        console.log(response)
        for (let i = 0; i < response.length; i++){
          let responseDepUser: DepUser = {};
          responseDepUser.id = response[i].id
          responseDepUser.name = response[i].nom +'  '+ response[i].prenom
          responseDepUser.inactive = false
          for (let j= 0; j<  this.affaire?.affaireUtilisateurs?.length; j++){
            console.log(this.affaire?.affaireUtilisateurs[i])
            if (this.affaire?.affaireUtilisateurs[j]?.utilisateur?.id === response[i].id){
              responseDepUser.inactive = true
            }
          }
          this.depUtilisateurs = [...this.depUtilisateurs, responseDepUser];
        }
        console.log(this.depUtilisateurs)
      },
      error => {
        this.handleError(error)
      }
    )
    this.addAffaireUtilisateurDisplay = true;
  }

  createAffaireUtilisateur() {
    this.showMaxAffaireUtilisateurDialog()
  }

  addUsersToAffaire(){
    this.addAffaireUtilisateurDisplay=false
    console.log(this.selectedDepUtilisateurs)
    for (let i = 0; i< this.selectedDepUtilisateurs.length; i++){
      let data = {
        "utilisateur": "/api/utilisateurs/"+ this.selectedDepUtilisateurs[i],
        "affaire": "/api/affaires/"+ this.affaire.id
      };
      console.log(data)
      this.restApi.createAffaireUtilisateurs(data).subscribe(
        response => {
          console.log(response)
          this.affaire.affaireUtilisateurs.push(response) ;
        },
        error => {
          console.log(error)
          this.handleError(error)
        }
      )
    }
    console.log(this.depUtilisateurs);
  }


  confirm(affaireUtilisateur:any) {
    this.confirmationService.confirm({
      message: 'Êtes vous sûr de retirer ce participant de l\'affaire?',
      accept: () => {
        this.removeAffaireUtilisateur(affaireUtilisateur)
      }
    });
  }

  removeAffaireUtilisateur(affaireUser: any) {
    this.loading = true
    console.log(affaireUser)
    this.restApi.removeAffaireUtilisateur(affaireUser.id).subscribe(
      response => {
        let index: number = 0
        for (let i = 0; i < this.affaire.affaireUtilisateurs.length; i++){
          if (this.affaire.affaireUtilisateurs[i].id === affaireUser.id){
            index = i;
            break;
          }
        }
        console.log(index)
        console.log(this.affaire.affaireUtilisateurs)
        this.affaire.affaireUtilisateurs.splice(index,1);
        this.loading = false
        console.log(response)
      },
      error => {
        this.loading = false
        this.handleError(error)
      }
    )
  }

  showPersonneDialog() {
    this.personneDialog = true
  }

  stepCompleted(index:any) {
    console.log(index)
  }


  onEntiteRowDblClick(entite: any) {
    this.entite = entite
    this.showEntite = true
    console.log(this.entite)
  }

  onRowUnselect() {
    this.showEntite = false
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  showDocumentDialog(src: string) {

    this.restApi.getImage(src).subscribe(
      response => {
        this.documentSource = response;
        console.log(this.documentSource)
        this.displayPdfViewer = true
        setTimeout(() => this.isPdfVisible = true);
        console.log(this.documentSource)
      }
    )

  }


  createTask() {
    if (this.task.titre){
      console.log(this.task)
      this.task.affaire =  "/api/affaires/"+this.id
      this.task.priorite = parseInt(this.task.priorite)
      this.restApi.createTache(this.task).subscribe(
        response => {
          let scope = this
          this.messageService.add({severity:'success', summary:'Tache envoyé avec succès'})
          setTimeout(function() {
              scope.router.navigate(['/'])
            }
            , 5000);
        },
        error => {

        }
      )
    }
    this.submitted = true
  }

  toCallAfterTimeOut(){
  }
}
