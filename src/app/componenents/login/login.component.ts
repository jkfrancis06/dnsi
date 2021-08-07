import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import {AuthService} from "../../services/auth/auth.service";
import {Message,MessageService} from 'primeng/api';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  submitted = false;

  loading = [false];

  msgs = [];

  errors = {
    username : false,
    password : false
  }


  constructor(private authenticationService: AuthService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', Validators.required)
    });
    this.messageService.add({severity:'success', summary:'Succes', detail:'Connexion reussie'});

  }

  onSubmit() {
    this.submitted = true;
    this.loadStart(0);

    this.errors.username = false
    this.errors.username = false
    // send login request to rest api
    this.authenticationService.login(
      this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        response => {
          console.log(response);
          let token = {
            token : response.token,
            expires : response.expires
          }
          localStorage.setItem('token-data',JSON.stringify(token));
          let user = response.user
          localStorage.setItem('user',JSON.stringify(user));
          console.log(user)
          this.loadEnd(0);
          this.showViaService(0);
          this.router.navigate([''],{ queryParams: { login: true } });
        },
        error => {
          this.loadEnd(0);
          if (error.status === 0 || error.status >= 500){
            this.showViaService(1)
          }else if (error.status === 401){
            this.errors.username = true
            this.errors.password = true
            this.messageService.add({severity:'error', summary:'Error', detail: error.error.message.message});
          }else {
            this.showViaService(1)
          }

          console.log(error)
        }
      );



  }

  loadStart(index:any) {
    this.loading[index] = true;
  }

  loadEnd(index:any) {
    this.loading[index] = false;
  }

  showViaService(error:number) {
    if (error === 1){
      this.messageService.add({severity:'error', summary:'Error', detail:'Something bad happened; please try again later'});
    }else {
      this.messageService.add({severity:'success', summary:'Succes', detail:'Connexion reussie'});
    }
  }

}
