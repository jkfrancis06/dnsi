import { Component, OnInit } from '@angular/core';
import {RestService} from "../../services/api/rest.service";
import {Affaire} from "../../models/affaire";
import {MenuItem, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-affaire',
  templateUrl: './affaire.component.html',
  styleUrls: ['./affaire.component.css'],
})
export class AffaireComponent implements OnInit {


  userAffaires!:any[];
  affaire?:any;

  newAffaire: any = {
    nom: "",
    description: "",
    niveauAccreditation: 1,
    source: "",
    resume: ""
  };

  affairesLoading = true;
  showAffaire = false

  items: MenuItem[] = [];
  displayAffaireCreateViewer: boolean = false;
  submitted: boolean = false;

  user: any;

  violation: boolean = false

  violations: any[] = [];


  constructor(private apiService: RestService,
              private router: Router,
              private messageService: MessageService

  ) { }

  ngOnInit(): void {


    let token_user = localStorage.getItem('user')
    if (token_user != null){
      this.user = JSON.parse(token_user)
    }
    console.log(this.user)


    // context menu

      this.items = [
        {
          label: 'Actualiser',
          routerLink: ['/affaires']
        },
        {
          label: 'Nouvelle affaire',
          icon: 'pi pi-fw pi-plus'
        }
      ];

      this.apiService.getUtilisateurAffaires().subscribe(
        response => {
          this.affairesLoading = false
          this.userAffaires = response
        },
        error => {
            console.log(error)
        }
      )
  }

  onAffaireRowDblClick(affaire:any){
    console.log(affaire)
    this.affaire = affaire
    this.showAffaire = true
  }

  onRowUnselect(){
    this.showAffaire = false;
  }


  affaireDetails() {
    this.router.navigate(['/affaire-details',this.affaire.id]);
  }

  displayAffaireDialog() {
    this.displayAffaireCreateViewer = true
  }

  createAffaire() {

    console.log(this.newAffaire)

    if (this.newAffaire.nom || this.newAffaire.description || this.newAffaire.niveauAccreditation || this.newAffaire.resume){
      this.violation = false
        this.apiService.createAffaire(this.newAffaire).subscribe(
          response => {
            this.userAffaires = [...this.userAffaires,response]
            this.displayAffaireCreateViewer = false
            this.messageService.add({severity:'success', summary:'Succès', detail:"Affaire crée avec succès"});
          },
          error => {
            console.log(error)
            this.handleError(error)
          }
        )
    }
    this.submitted = true
  }

  handleError(error: any){
    if (error.status === 422){
      this.violation = true
      this.violations = error.error.violations
    }
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
