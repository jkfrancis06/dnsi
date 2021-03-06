import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, MessageService, SelectItemGroup} from "primeng/api";
import {RestService} from "../../services/api/rest.service";
import {DepUser} from "../../models/depUser";
import {ConfirmationService} from 'primeng/api';
import {Subscription} from "rxjs";
import {PersonneService} from "../../services/personne/personne.service";
import {ConstantsService} from "../../services/general/constants.service";
import {EnvenementService} from "../../services/envenement/envenement.service";
import {HttpClient} from "@angular/common/http";
import {FileSaverService} from "ngx-filesaver";
import {DatePipe} from "@angular/common";


interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-affaire-details',
  templateUrl: './affaire-details.component.html',
  styleUrls: ['./affaire-details.component.css'],
  providers: [MessageService,ConfirmationService,DatePipe]
})



export class AffaireDetailsComponent implements OnInit {


  index: number = 0;  // tab nav index

  id?: any ;

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
  evenementSubscription: Subscription = new Subscription;
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
  isAdmin:boolean = false

  task: any = {
    titre: "Demande d'access",
    priorite: 1 as number,
    expireAt: new Date(new Date().getTime()+(5*24*60*60*1000)),
    resume: "<b>Demande d'autorisation</b><div>Demande de consultation de ce dossier</div><div><br></div>"
  };



  submitted: boolean = false;
  minDateValue = new Date();

  affaireUtilisateurs: any[] = []
  isConsultant: boolean = false;
  isAffaireUtilisateur: boolean = false;
  displayEventCreateViewer: boolean = false;
  eventDialog: boolean = false;
  eventSteps: MenuItem[] = [];
  envenements: any[] = [];
  envenement : any;
  SERVER_URL = "";
  displayEnvent: boolean = false;
  chartEvents: any[] = [];
  eventChartReady: boolean = false;
  adminPanelItems: MenuItem[] = [];
  removeAffaireUtilisateurDisplay: boolean = false;
  removeCanConsultDisplay: boolean = false;
  displayAdminRevoqueModal: boolean = false;
  affaireDirectors: any[] = [];
  affaireDirector: any;
  addAdminstratorModal: boolean = false;
  selectedAdminstrators: any[] = [];


  constructor(
    private activatedroute:ActivatedRoute,
    private router: Router,
    private restApi: RestService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public personneService: PersonneService,
    public constService: ConstantsService,
    public envenementService: EnvenementService,
    public constantService: ConstantsService,
    private httpClient: HttpClient,
    private _FileSaverService: FileSaverService,
    public datepipe: DatePipe

  ) {
    let local = localStorage.getItem('user')
    if (local != null) {
      this.user = JSON.parse(local)
    }
    console.log(this.user)



  }

  ngOnInit(): void {

    this.SERVER_URL = this.constService.SERVER_ADDRESS

    // @ts-ignore
    this.activatedroute.firstChild.params.subscribe(params => {
      this.id = +params['id'];

      this.restApi.getAffaire(this.id).subscribe(
        response => {
          console.log(response)
          this.affaire = response
          for (let i = 0 ; i< response.affaireUtilisateurs.length ; i++){
            if (response.affaireUtilisateurs[i].utilisateur.id === this.user.id){
              this.isAffaireUtilisateur = true;
            }
          }
          for (let i = 0; i< response.canConsults.length; i++){
            if (response.canConsults[i].utilisateur.id === this.user.id){ // is in consultants list
              this.isConsultant = true;
            }
          }
          this.restApi.getAffaireDirectedBy(this.id).subscribe(
            response => {
              for (let i = 0; i< response.length; i++){
                if (this.user.id === response[i].utilisateur.id && response[i].isRevoked === false){
                  this.isAdmin = true;
                }
              }
            }
          )
          this.affaireLoading = false
        },
        error => {
          this.affaireLoading = false
          console.log(error)
          this.handleError(error)
        }
      )

    });

    this.eventSteps = [
      {
        label: 'Informations g??n??rales',
        routerLink: ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'envenement'}}]
      },
      {
        label: 'Entit??s impliqu??es',
        routerLink: ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'entitesImpliques'}}]
      },
      {
        label: 'Enqueteur impliqu??s',
        routerLink: ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'utilisateurImpliques'}}]
      },
      {
        label: 'Rapport d\'evenemment',
        routerLink: ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'rapportInitial'}}]
      },
      {
        label: 'Fichiers joints',
        routerLink: ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'fichiersEnvenement'}}]
      },
      {
        label: 'Recapitulatif',
        routerLink: ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'recapEnvenement'}}]
      },
    ];


    this.personneSteps = [
      {
        label: 'Type',
        routerLink: ['/affaire-details/'+ this.id ,{outlets:{entiteRoute:'type'}}]

      },
      {
      label: 'Informations Generales',
        routerLink: ['/affaire-details/'+ this.id ,{outlets:{entiteRoute:'general-info'}}]
      },
      {
        label: 'Role',
        routerLink: ['/affaire-details/'+ this.id ,{outlets:{entiteRoute:'role'}}]
      },
      {
        label: 'Fichiers joints',
        routerLink: ['/affaire-details/'+ this.id ,{outlets:{entiteRoute:'fichiers'}}]
      },
      {
        label: 'Recaptitulatif',
        routerLink: ['/affaire-details/'+ this.id ,{outlets:{entiteRoute:'recap'}}]
      }
    ];

    this.subscription = this.personneService.inputComplete$.subscribe((personalInformation) =>{
      console.log(personalInformation)
      this.personneDialog = false
      this.entites.push(personalInformation)
      this.messageService.add({severity:'success', summary:'Entit?? cr??e avec succ??s'});
      this.personneService.resetData()
      this.router.navigate(['/affaire-details/'+this.id])
      console.log(this.entites)
    });


    this.evenementSubscription = this.envenementService.envenementInputComplete$.subscribe((envenementInfo) =>{
      console.log(envenementInfo)
      this.eventDialog = false
      this.envenements.push(envenementInfo)
      this.messageService.add({severity:'success', summary:'Evenement cr??e avec succ??s'});
      this.envenementService.resetData()
      this.router.navigate(['/affaire-details/'+this.id])
      console.log(this.envenements)
    });


    this.adminPanelItems = [
      {
        label: 'Enqu??teurs',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Ajouter',
            command: (event => {
              this.createAffaireUtilisateur()
            })
          },
          {
            label: 'Supprimer',
            command: (event => {
              this.removeAffaireUtilisateurModal()
            })
          }
        ]
      },
      {
        label: 'Invit??s',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Revoquer',
            command: event => {
              this.removeCanConsultDisplay = true
            }
          }
        ]
      },
      {
        label: 'Administrateurs',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Ajouter',
            command: event => {
              this.addAdminDialog()
            }
          },
          {
            label: 'Revoquer',
            command: event => {
              this.getAffaireDirectors()
            }
          }
        ]
      },
      {
        label: 'Ce dossier',
        icon: 'pi pi-fw pi-folder',
        items: [
          {label: 'Cl??turer', icon: 'pi pi-fw pi-circle'},
          {label: 'R??ouvrir', icon: 'pi pi-fw pi-open'}
        ]
      }
    ];



  }

  revoquerConsultant(index:any,id:any){
    this.restApi.revoquerConsult(id).subscribe(
      response => {
        console.log(response)
        console.log(index)
        console.log(this.affaire.canConsults)
        this.affaire.canConsults[index] = response
      },
      error => {
        this.handleError(error)
      }
    )
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

    if (this.index === 1) {  // tab entit??s
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

    if (this.index === 2) { // envenements tab
        this.restApi.getAffaireEnvenements(this.id).subscribe(
          response => {
            console.log(response)
            this.envenements = response
          },
          error => {
              this.handleError(error)
          }
        )
    }

    if (this.index === 3) {   // timeline
      this.restApi.getAffaireEnvenements(this.id).subscribe(
        response => {
          this.chartEvents = response
          this.eventChartReady = true
        },
        error => {
          this.handleError(error)
        }
      )
    }

    if (this.index === 4) { // admin panel



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
      message: '??tes vous s??r de retirer ce participant de l\'affaire?',
      accept: () => {
        this.removeAffaireUtilisateur(affaireUtilisateur)
      }
    });
  }

  confirmInvite(index: any,id: any) {
    this.confirmationService.confirm({
      message: '??tes vous s??r de revoquer l\'acc??s a cet invit?? ?',
      accept: () => {
          console.log(index)
          this.revoquerConsultant(index,id)
      },
      key: "invitesConfirm"
    });
  }

  confirmRevoqueDir(index: any,id: any) {
    this.confirmationService.confirm({
      message: '??tes vous s??r de voiloir revoquer les droits de cet administrateur ?',
      accept: () => {
        console.log(index)
        this.revoqueAffaireDir(index,id)
      },
      key: "revoqueConfirm"
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
    this.router.navigate( ['/affaire-details/'+ this.id ,{outlets:{entiteRoute:'type'}}]);
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
          this.messageService.add({severity:'success', summary:'Tache envoy?? avec succ??s'})
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

  createEnvenement() {
    this.router.navigate( ['/affaire-details/'+ this.id ,{outlets:{eventRoute:'envenement'}}]);
    this.eventDialog = true
  }

  close() {
    console.log('ok')
  }



  onEnvenementRowSelect(envent: any) {
    this.envenement = envent
    this.displayEnvent = true
  }

  downloadFile(files: any) {
    this.httpClient.get(this.SERVER_URL+"/file/get/"+files, {
      observe: 'response',
      responseType: 'blob'
    }).subscribe(res => {
      this._FileSaverService.save(res.body, files);
    });
    return;
  }

  removeAffaireUtilisateurModal() {
    this.removeAffaireUtilisateurDisplay = true
  }

  getAffaireDirectors(){
    this.restApi.getAffaireDirectedBy(this.id).subscribe(
      response => {
        console.log(response)
        this.displayAdminRevoqueModal = true
        this.affaireDirectors = response
      },
      error => {
        this.handleError(error)
      }
    )
  }

  revoqueAffaireDir(index:any, id: any){
      this.restApi.putAffaireDirectedBy(id).subscribe(
        response => {
          this.affaireDirectors[index] = response
        },
        error => {
          this.handleError(error)
        }
      )
  }


  addAdminDialog() {  // show dialog to assign admin to affaire
    this.depUtilisateurs = []
    this.selectedAdminstrators = []
    this.addAdminstratorModal = true
    this.restApi.getAffaireDirectedBy(this.id).subscribe(
      response => {
        console.log(response)
        this.affaireDirectors = response
        for (let i = 0; i<this.affaire.affaireUtilisateurs.length; i++){
          let responseDepUser: DepUser = {};
          responseDepUser.id = this.affaire.affaireUtilisateurs[i].utilisateur.id
          responseDepUser.name = this.affaire.affaireUtilisateurs[i].utilisateur.nom +'  '+ this.affaire.affaireUtilisateurs[i].utilisateur.prenom
          responseDepUser.inactive = false
          for (let j = 0; j<this.affaireDirectors.length; j++){
            if (this.affaireDirectors[j].utilisateur.id === this.affaire.affaireUtilisateurs[i].utilisateur.id){
              responseDepUser.inactive = true
            }
          }
          this.depUtilisateurs = [...this.depUtilisateurs,responseDepUser]
        }
      }
    )
  }

  createDirectors() {
    this.addAdminstratorModal = false
    console.log(this.selectedAdminstrators)
    for (let i = 0; i< this.selectedAdminstrators.length; i++){
      let data = {
        utilisateur: "/api/utilisateurs/"+this.selectedAdminstrators[i],
        affaire: "/api/affaires/"+this.id
      }
      this.restApi.postAffaireDirectedBy(data).subscribe(
        response =>{

        },
        error => {
          this.handleError(error)
        }
      )
    }
  }
}
