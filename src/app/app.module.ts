import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componenents/login/login.component';
import { HomeComponent } from './componenents/home/home.component';



import {InputTextModule} from 'primeng/inputtext';

import { ButtonModule } from "primeng/button";
import { PanelModule } from "primeng/panel";
import { RippleModule } from "primeng/ripple";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {MenuModule} from "primeng/menu";
import {MenubarModule} from "primeng/menubar";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {TableModule} from "primeng/table";
import {FieldsetModule} from "primeng/fieldset";
import {SkeletonModule} from "primeng/skeleton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NavbarComponent } from './componenents/navbar/navbar.component';
import {DialogModule} from "primeng/dialog";
import { LogoutComponent } from './componenents/logout/logout.component';
import { AffaireComponent } from './componenents/affaire/affaire.component';
import { AffaireDetailsComponent } from './componenents/affaire-details/affaire-details.component';
import {ContextMenuModule} from "primeng/contextmenu";
import {TabMenuModule} from "primeng/tabmenu";
import {TabViewModule} from "primeng/tabview";
import {TagModule} from "primeng/tag";
import {MessageService} from "primeng/api";
import {ListboxModule} from "primeng/listbox";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SplitButtonModule} from "primeng/splitbutton";
import {StepsModule} from "primeng/steps";
import { InformationsGeneralesComponent } from './componenents/steps/personne/informations-generales/informations-generales.component';
import {CalendarModule} from "primeng/calendar";
import { RoleComponent } from './componenents/steps/personne/role/role.component';
import {EditorModule} from "primeng/editor";
import { FichiersComponent } from './componenents/steps/personne/fichiers/fichiers.component';
import {FileUploadModule} from "primeng/fileupload";
import {NgxDropzoneModule} from "ngx-dropzone";
import { RecapComponent } from './componenents/steps/personne/recap/recap.component';
import { TypeComponent } from './componenents/steps/personne/type/type.component';
import {GalleriaModule} from "primeng/galleria";
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import {InputTextareaModule} from "primeng/inputtextarea";
import {NgxDocViewerModule} from "ngx-doc-viewer";
import {RadioButtonModule} from "primeng/radiobutton";
import {OverlayPanelModule} from "primeng/overlaypanel";
import { GeneralComponent } from './componenents/steps/envenement/general/general.component';
import { EntitesImpliquesComponent } from './componenents/steps/envenement/entites-impliques/entites-impliques.component';
import { UtilisateurImpliquesComponent } from './componenents/steps/envenement/utilisateur-impliques/utilisateur-impliques.component';
import { RecapEnvenementComponent } from './componenents/steps/envenement/recap-envenement/recap-envenement.component';
import { RapportInitialComponent } from './componenents/steps/envenement/rapport-initial/rapport-initial.component';
import { FichiersEnvenementComponent } from './componenents/steps/envenement/fichiers-envenement/fichiers-envenement.component';
import {ChipModule} from "primeng/chip";
import {FileSaverModule} from "ngx-filesaver";
import {TimelineModule} from "primeng/timeline";
import { RelationWithComponent } from './componenents/steps/personne/relation-with/relation-with.component';
import {SlideMenuModule} from "primeng/slidemenu";
import { SearchComponent } from './components/search/search.component';
import {CheckboxModule} from "primeng/checkbox";
import {SelectButtonModule} from "primeng/selectbutton";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    LogoutComponent,
    AffaireComponent,
    AffaireDetailsComponent,
    InformationsGeneralesComponent,
    RoleComponent,
    FichiersComponent,
    RecapComponent,
    TypeComponent,
    GeneralComponent,
    EntitesImpliquesComponent,
    UtilisateurImpliquesComponent,
    RecapEnvenementComponent,
    RapportInitialComponent,
    FichiersEnvenementComponent,
    RelationWithComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,



    InputTextModule,
    PanelModule,
    RippleModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    DividerModule,
    ProgressSpinnerModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    MenuModule,
    MenubarModule,
    DividerModule,
    ScrollPanelModule,
    TableModule,
    FieldsetModule,
    SkeletonModule,
    DialogModule,
    ContextMenuModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    ListboxModule,
    ConfirmDialogModule,
    SplitButtonModule,
    StepsModule,
    CalendarModule,
    EditorModule,
    FileUploadModule,
    NgxDropzoneModule,
    GalleriaModule,
    NgxExtendedPdfViewerModule,
    InputTextareaModule,
    NgxDocViewerModule,
    RadioButtonModule,
    OverlayPanelModule,
    ChipModule,
    FileSaverModule,
    TimelineModule,
    SlideMenuModule,
    CheckboxModule,
    SelectButtonModule

  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
