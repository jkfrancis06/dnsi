import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./componenents/login/login.component";
import {HomeComponent} from "./componenents/home/home.component";
import {AuthGuard} from "./core/auth.guard";
import {LogoutComponent} from "./componenents/logout/logout.component";
import {AffaireComponent} from "./componenents/affaire/affaire.component";
import {AffaireDetailsComponent} from "./componenents/affaire-details/affaire-details.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'affaires', component: AffaireComponent, canActivate: [AuthGuard]},
  { path: 'affaire-details/:id', component: AffaireDetailsComponent, canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
