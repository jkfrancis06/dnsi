import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fichiers',
  templateUrl: './fichiers.component.html',
  styleUrls: ['./fichiers.component.css']
})
export class FichiersComponent implements OnInit {

  uploadedFiles: any[] = [];
  uploadedOtherFiles: any[] = [];

  files: File[] = [];


  constructor() { }

  ngOnInit(): void {
  }


  onUpload(event: { files: any; }) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelect(event : any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

}
