import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../../services/api/rest.service";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonneService} from "../../../../services/personne/personne.service";

@Component({
  selector: 'app-fichiers',
  templateUrl: './fichiers.component.html',
  styleUrls: ['./fichiers.component.css']
})
export class FichiersComponent implements OnInit {

  uploadedFiles: any[] = [];
  uploadedOtherFiles: any[] = [];

  files: File[] = [];
  videofiles: File[] = [];
  otherfiles: File[] = [];

  progress: number = 0;
  inProgress: boolean = false;

  imagesUploaded: boolean = false;
  videosUploaded: boolean = false;
  otherUploaded: boolean = false;

  images: any[] = [];
  videos: any[] = [];
  others: any[] = [];

  id: any;

  constructor(
    private apiService: RestService,
    private messageService: MessageService,
    private router: Router,
    public personneService: PersonneService,
    private activatedroute:ActivatedRoute,


  ) { }

  ngOnInit(): void {

    this.activatedroute?.parent?.params.subscribe((params) => {
      console.log('params', params);
      this.id = params.id
    })


  }



  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onVideoRemove(event: any) {
    console.log(event);
    this.videofiles.splice(this.videofiles.indexOf(event), 1);
  }

  onOtherRemove(event: any) {
    console.log(event);
    this.otherfiles.splice(this.otherfiles.indexOf(event), 1);
  }

  onSelect(event : any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[i]);
    }
  }


  onVideoSelect(event : any) {
    console.log(event);
    this.videofiles.push(...event.addedFiles);
    const formData = new FormData();
    for (var i = 0; i < this.videofiles.length; i++) {
      formData.append("file[]", this.videofiles[i]);
    }
  }


  onOtherSelect(event : any) {
    console.log(event);
    this.otherfiles.push(...event.addedFiles);
    const formData = new FormData();
    for (var i = 0; i < this.otherfiles.length; i++) {
      formData.append("file[]", this.otherfiles[i]);
    }
  }

  loadingCompleted(){
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[i]);
    }
    return formData.get('file[]')
  }

  submit(type: number){

    this.inProgress = true

    const formData = new FormData();

    if (type === 1){
      for (var i = 0; i < this.files.length; i++) {
        formData.append("file[]", this.files[i]);
      }
    }

    if (type === 2) {
      for (var i = 0; i < this.videofiles.length; i++) {
        formData.append("file[]", this.videofiles[i]);
      }
    }
    if (type === 3) {
      for (var i = 0; i < this.otherfiles.length; i++) {
        formData.append("file[]", this.otherfiles[i]);
      }
    }




    this.apiService.uploadFiles(formData).subscribe((event: HttpEvent<any>) => {

        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            // @ts-ignore
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log(event)
            console.log('User successfully created!', event.body);
            setTimeout(() => {
              this.progress = 0;
              this.inProgress = false
              if (type === 1){
                this.imagesUploaded = true
                this.images = event.body
              }
              if (type === 2){
                this.videosUploaded = true
                this.videos = event.body
              }
              if (type === 3){
                this.otherUploaded = true
                this.others = event.body
              }
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Envoi des fichiers terminées'});
            }, 1500);
        }
      }
      ,
      error => {
          this.handleError(error)
      }
    )

    console.log(formData.get("file[]"))
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
    this.router.navigate( ['/affaire-details/'+ this.id ,{outlets:{entiteRoute:'role'}}]);
  }

  nextPage() {
    this.personneService.personneInformation.attachementInformation.autres = this.others
    this.personneService.personneInformation.attachementInformation.videos = this.videos
    this.personneService.personneInformation.attachementInformation.images = this.images
    console.log(this.personneService.personneInformation)
    this.personneService.setPersonneInformation(this.personneService.personneInformation)
    this.router.navigate( ['/affaire-details/'+ this.id ,{outlets:{entiteRoute:'recap'}}]);

  }
}
