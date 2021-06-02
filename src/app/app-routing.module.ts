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
import {GeneralComponent} from "./componenents/steps/envenement/general/general.component";
import {EntitesImpliquesComponent} from "./componenents/steps/envenement/entites-impliques/entites-impliques.component";
import {UtilisateurImpliquesComponent} from "./componenents/steps/envenement/utilisateur-impliques/utilisateur-impliques.component";
import {RecapEnvenementComponent} from "./componenents/steps/envenement/recap-envenement/recap-envenement.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'affaires', component: AffaireComponent, canActivate: [AuthGuard]},

  // personne steps routing
  { path: 'affaire-details/:id', component: AffaireDetailsComponent, canActivate: [AuthGuard], children: [
      { path: '', component: AffaireDetailsComponent},
      {path: 'general-info', component: InformationsGeneralesComponent,outlet: 'entiteRoute'},
      {path: 'role', component: RoleComponent, outlet: 'entiteRoute'},
      {path: 'fichiers', component: FichiersComponent, outlet: 'entiteRoute'},
      {path: 'recap', component: RecapComponent, outlet: 'entiteRoute'},
      {path: 'type', component: TypeComponent, outlet: 'entiteRoute'},
      {path: 'envenement', component: GeneralComponent, outlet: 'eventRoute'},
      {path: 'entitesImpliques', component: EntitesImpliquesComponent, outlet: 'eventRoute'},
      {path: 'utilisateurImpliques', component: UtilisateurImpliquesComponent, outlet: 'eventRoute'},
      {path: 'recapEnvenement', component: RecapEnvenementComponent, outlet: 'eventRoute'},
    ]},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
