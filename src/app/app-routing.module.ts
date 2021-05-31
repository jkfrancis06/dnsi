import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./componenents/login/login.component";
import {HomeComponent} from "./componenents/home/home.component";
import {AuthGuard} from "./core/auth.guard";
import {LogoutComponent} from "./componenents/logout/logout.component";
import {AffaireComponent} from "./componenents/affaire/affaire.component";
import {AffaireDetailsComponent} from "./componenents/affaire-details/affaire-details.component";
import {InformationsGeneralesComponent} from "./componenents/steps/personne/informations-generales/informations-generales.component";
import {RoleComponent} from "./componenents/steps/personne/role/role.component";
import {FichiersComponent} from "./componenents/steps/personne/fichiers/fichiers.component";
import {RecapComponent} from "./componenents/steps/personne/recap/recap.component";
import {TypeComponent} from "./componenents/steps/personne/type/type.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'affaires', component: AffaireComponent, canActivate: [AuthGuard]},

  // personne steps routing
  { path: 'affaire-details/:id', component: AffaireDetailsComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'type', pathMatch: 'full'},
      {path: 'general-info', component: InformationsGeneralesComponent},
      {path: 'role', component: RoleComponent},
      {path: 'fichiers', component: FichiersComponent},
      {path: 'recap', component: RecapComponent},
      {path: 'type', component: TypeComponent},
    ]},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
