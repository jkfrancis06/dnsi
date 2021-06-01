import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {RestService} from "../../services/api/rest.service";
import {Tache} from "../../models/tache";
import {Message,MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../../models/task";
import {MenuItem} from 'primeng/api';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
  styles: [`
        .outofstock {
            font-weight: 700;
            color: #FF5252;
        }

        .lowstock {
            font-weight: 700;
            color: #FFA726;
        }

        .instock {
            font-weight: 700;
            color: #66BB6A;
        }

        :host ::ng-deep .row-accessories {
          font-weight: bold;
        }
    `
  ]

})
export class HomeComponent implements OnInit {

  // loaders
  taches_loading = true
  demandes_taches_loading = true
  tache_details_loading = false
  // init entity
  tache?: Tache = {
    id: 0,
    tache: {
      id: 0,
      priorite: 0,
      createdAt: '',
      lastUpdate: '',
      expireAt: '',
      titre: "",
      resume: ""
    },
    utilisateur: "",
    statut: "",
    updatedAt: "",
    remarque: ""
  };
  taches! : any[]
  task?: Task;
  show_task = false;  //hide task detail box
  user? : any;  // user entity
  selected_tache_utilisateur?: any;
  selected_tache_utilisateur_objet?: any;
  current_date? = new Date().toLocaleString();
  current_timestamp?:number = Date.now();
  displayRemarkModal?: boolean;
  confirmIsLoading = false
  rejectIsLoading = false

  userCreatedTasks!: any[]

  items: MenuItem[] = [];

  canConsult : any = {
    expireAt: new Date(new Date().getTime()+(5*24*60*60*1000)),
    isRevoked: false
  }
  minDateValue : any = new Date();

  taskId: number = 0;





  constructor(
    private apiService: RestService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    // context menu

    this.items = [
      {
        label: 'Actualiser',
        routerLink: ['/']
      }
    ];


    let store = localStorage.getItem('user');
    if (store != null) {
      this.user = JSON.parse(store); // get user data
    }
    this.taches = [];
    this.taches_loading = true  // init loader
    this.apiService.getUserTasks().subscribe(
      response => {
        console.log(response)
        for (let i = 0; i < response.length ; i++) {
          // @ts-ignore
          this.tache = response[i]
          let tmst = new Date(response[i]?.tache?.expireAt!).getTime()
          if (this.current_timestamp != null){
            console.log(tmst < this.current_timestamp)
          }
          // @ts-ignore
          this.taches.push(this.tache) // set data into array

        }
        this.apiService.getUserTaskCreated().subscribe(
          response => {
            this.userCreatedTasks = response
            this.taches_loading = false  // dismiss loader
          },
          error => {
              this.handleError(error)
          }
        )
      },
      error => {
        this.handleError(error)
      }
    );
  }


  showViaService(error:number, message:any = null) {
    if (error === 1){
      this.messageService.add({severity:'error', summary:'Error', detail:'Something bad happened; please try again later'});
    }else {
      this.messageService.add({severity:'success', summary:'Succes'});
    }
  }

  onRowSelect(event:any) {
    this.tache_details_loading = true //loader
    this.selected_tache_utilisateur = event.id
    this.selected_tache_utilisateur_objet = event
    console.log(this.userCreatedTasks)
    this.apiService.getTask(event.tache.id).subscribe(
      response => {
        this.task! = response!
        console.log(this.task)
        this.tache_details_loading = false
        this.show_task = true;
        if (this.task?.createdAt != null){
          console.log(this.task?.createdAt < new Date().toLocaleString())
        }
      },
      error => {
        this.handleError(error)
      }
    );
  }

  onTaskRowSelect(data:any){
    console.log(data)
    this.tache_details_loading = true //loader
    this.selected_tache_utilisateur = data.id
    this.selected_tache_utilisateur_objet = data
    console.log(data.id)
    this.apiService.getTask(data.id).subscribe(
      response => {
        this.task! = response!
        console.log(this.task)
        this.tache_details_loading = false
        this.show_task = true;
        if (this.task?.createdAt != null){
          console.log(this.task?.createdAt < new Date().toLocaleString())
        }
      },
      error => {
        this.handleError(error)
      }
    );
  }

  updateTask(id?:number, type?:number){
    console.log(this.selected_tache_utilisateur)
    let index: number = 0;
    if (this.taches != null){
      for (let i=0; i<this.taches.length; i++){
        console.log(this.taches[i]["id"])
        if (this.taches[i]["id"] === this.selected_tache_utilisateur ){
          index = i;
          break;
        }
      }
    }
    if (type === 0){  // reject
      this.updateTaskRequest(index,'Rejeté')
    }else {  // accept
      console.log(this.taches[index])
      this.canConsult.affaire = "/api/affaires/"+this.task?.affaire?.id
      this.canConsult.utilisateur = "/api/utilisateurs/"+this.task?.createdBy?.id
      console.log(this.canConsult)
      this.apiService.createConsult(this.canConsult).subscribe(
        response => {
          this.updateTaskRequest(index,'Accepté')
        },
        error => {
            this.handleError(error)
        }
      )
      //this.updateTaskRequest(index,'Accepté')
    }
  }


  updateTaskRequest(index:number,statut:string){
    this.taches[index]['statut'] = statut
    this.apiService.updateTacheUtilisateur(this.selected_tache_utilisateur,this.taches[index]).subscribe(
      response => {
        this.taches_loading = false  // dismiss loader
        this.taches[index] = response  // update tacheutilisateur in component
        if (this.task?.tacheUtilisateurs != null){
          for (var i = 0; i< this.task?.tacheUtilisateurs?.length; i++){  // update tacheutilisateur in details
            if (this.task.tacheUtilisateurs != null){
              if (this.task?.tacheUtilisateurs[i]["id"] === this.selected_tache_utilisateur){
                this.task.tacheUtilisateurs[i].statut = response["statut"]
                this.task.tacheUtilisateurs[i].remarque = response["remarque"]
                this.showViaService(0)
                break
              }
            }
          }
        }

      },
      error => {
        this.handleError(error)
      }
    );
  }


  handleError(error: any){
    this.taches_loading = false  // dismiss loader
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

}
